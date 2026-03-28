"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { distance2d, lerp, normalizeDistance } from "@/lib/hand-distance";

/** MediaPipe hand landmark index: middle finger MCP (stable for inter-hand distance). */
const MIDDLE_FINGER_MCP = 9;

const MEDIAPIPE_TASKS_VERSION = "0.10.34";
const WASM_BASE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_TASKS_VERSION}/wasm`;
const HAND_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";

/** Normalized distance between middle MCPs; tweak for sensitivity. */
const MIN_HAND_SPAN = 0.08;
const MAX_HAND_SPAN = 0.78;

/** When fewer than two hands are visible, ease `targetSpread` toward this neutral value. */
const DEFAULT_SPREAD = 0.5;
const SINGLE_HAND_DECAY = 0.045;

const SMOOTH_TO_TARGET = 0.14;
const SPHERE_SCALE_MIN = 0.42;
const SPHERE_SCALE_RANGE = 1.38;

/**
 * Supersedes previous in-flight `startExperience` when the user clicks again.
 * Not bumped on effect cleanup — that broke camera access under React Strict Mode
 * (fake unmount invalidated the session before getUserMedia ran).
 */
let handStartRequestId = 0;

type HandLandmarkerRunning = Awaited<
  ReturnType<typeof HandLandmarker.createFromOptions>
>;

type ExperiencePhase = "idle" | "loading" | "ready" | "error";

/** MediaPipe close() can throw during WASM teardown (e.g. React Strict Mode) or double-close. */
function safeCloseLandmarker(
  landmarker: HandLandmarkerRunning | null | undefined,
): void {
  if (!landmarker) {
    return;
  }
  try {
    landmarker.close();
  } catch {
    // Ignore: already closed or native runtime race.
  }
}

function SphereScene({
  targetSpreadRef,
}: {
  targetSpreadRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<Mesh>(null);
  const smoothedRef = useRef(DEFAULT_SPREAD);
  useFrame(() => {
    const target = targetSpreadRef.current;
    smoothedRef.current = lerp(smoothedRef.current, target, SMOOTH_TO_TARGET);
    const s = smoothedRef.current;
    const scale = SPHERE_SCALE_MIN + s * SPHERE_SCALE_RANGE;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#c4b5fd"
        metalness={0.28}
        roughness={0.38}
      />
    </mesh>
  );
}

const MSG_CAMERA_BLOCKED_ALREADY =
  "La cámara para este sitio ya está bloqueada o en «Bloquear»: el navegador no muestra de nuevo el aviso. En Chrome/Edge: icono del candado o «i» junto a la URL → Permisos de sitio → Cámara → «Permitir». En Safari: Ajustes → Sitios web → Cámara. Después pulsa otra vez «Iniciar cámara».";

const MSG_CAMERA_NOT_ALLOWED_AFTER_PROMPT =
  "No se pudo usar la cámara. Si no apareció ninguna ventana, suele ser porque antes se eligió «Bloquear» para este origen: restablece el permiso con el candado junto a la URL. Revisa también extensiones, modo incógnito con políticas estrictas, o si la app va dentro de un marco (iframe) sin allow=\"camera\".";

const MSG_CAMERA_INSECURE =
  "La cámara solo funciona en contexto seguro: HTTPS o http://localhost (y a veces 127.0.0.1). Si abres la app por http://192.168.x.x u otra IP de la red, el navegador puede bloquear la cámara sin aviso; en ese caso usa http://localhost:PUERTO en el mismo ordenador.";

const MSG_CAMERA_NO_API =
  "Este navegador no expone `getUserMedia` (o no hay contexto seguro). Prueba otro navegador o abre la página en https / localhost.";

async function querySiteCameraPermission(): Promise<"granted" | "denied" | "prompt" | "unknown"> {
  if (typeof navigator === "undefined" || !navigator.permissions?.query) {
    return "unknown";
  }
  try {
    const status = await navigator.permissions.query({
      name: "camera" as PermissionName,
    });
    if (status.state === "granted") {
      return "granted";
    }
    if (status.state === "denied") {
      return "denied";
    }
    return "prompt";
  } catch {
    return "unknown";
  }
}

function statusMessage(phase: ExperiencePhase, errorText: string): string {
  switch (phase) {
    case "idle":
      return "Pulsa el botón para activar la cámara y cargar el modelo.";
    case "loading":
      return "Solicitando acceso a la cámara y cargando el modelo…";
    case "ready":
      return "Muestra ambas manos: al alejarlas la esfera crece; al acercarlas, se encoge.";
    case "error":
      return errorText || "No se pudo iniciar la experiencia.";
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

function formatStartError(e: unknown): string {
  if (e instanceof DOMException) {
    if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
      return MSG_CAMERA_NOT_ALLOWED_AFTER_PROMPT;
    }
    if (e.name === "NotFoundError" || e.name === "DevicesNotFoundError") {
      return "No se encontró ninguna cámara.";
    }
    if (e.name === "NotReadableError") {
      return "La cámara está en uso por otra aplicación o no se puede leer.";
    }
    if (e.name === "OverconstrainedError") {
      return "Ninguna cámara cumple las restricciones pedidas. Prueba otro dispositivo o desconecta cámaras virtuales.";
    }
    return e.message || "No se pudo acceder a la cámara.";
  }
  if (e instanceof Error) {
    return e.message;
  }
  return "Error desconocido al iniciar.";
}

export function HandSphereExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<HandLandmarkerRunning | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const targetSpreadRef = useRef(DEFAULT_SPREAD);
  /** False after real unmount / Strict Mode teardown; avoids setState on a torn-down instance. */
  const mountedRef = useRef(true);
  const [phase, setPhase] = useState<ExperiencePhase>("idle");
  const [errorText, setErrorText] = useState("");
  /** Mount WebGL canvas only after ML + camera are ready to avoid losing the GL context to MediaPipe WASM. */
  const [canvasReady, setCanvasReady] = useState(false);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopTracks();
      safeCloseLandmarker(landmarkerRef.current);
      landmarkerRef.current = null;
    };
  }, [stopTracks]);

  useEffect(() => {
    if (phase !== "ready") {
      setCanvasReady(false);
      return;
    }
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) {
          setCanvasReady(true);
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [phase]);

  const startExperience = useCallback(async () => {
    const requestId = ++handStartRequestId;
    setErrorText("");
    targetSpreadRef.current = DEFAULT_SPREAD;
    if (typeof window !== "undefined" && !window.isSecureContext) {
      if (mountedRef.current) {
        setPhase("error");
        setErrorText(MSG_CAMERA_INSECURE);
      }
      return;
    }
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      if (mountedRef.current) {
        setPhase("error");
        setErrorText(MSG_CAMERA_NO_API);
      }
      return;
    }
    const sitePermission = await querySiteCameraPermission();
    if (!mountedRef.current) {
      return;
    }
    if (sitePermission === "denied") {
      setPhase("error");
      setErrorText(MSG_CAMERA_BLOCKED_ALREADY);
      return;
    }
    setPhase("loading");
    let landmarker: HandLandmarkerRunning | null = null;
    let stream: MediaStream | null = null;
    const superseded = (): boolean => requestId !== handStartRequestId;
    const abandonIfUnmounted = (): boolean => {
      if (mountedRef.current) {
        return false;
      }
      stopTracks();
      safeCloseLandmarker(landmarker);
      if (landmarkerRef.current === landmarker) {
        landmarkerRef.current = null;
      }
      return true;
    };
    try {
      const videoConstraints: MediaTrackConstraints = {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      };
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });
      } catch (constraintErr) {
        if (
          constraintErr instanceof DOMException &&
          constraintErr.name === "OverconstrainedError"
        ) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        } else {
          throw constraintErr;
        }
      }
      if (superseded()) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      if (abandonIfUnmounted()) {
        return;
      }
      stopTracks();
      streamRef.current = stream;

      const wasm = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
      landmarker = await HandLandmarker.createFromOptions(wasm, {
        baseOptions: {
          modelAssetPath: HAND_MODEL_URL,
          delegate: "CPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      if (superseded()) {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        safeCloseLandmarker(landmarker);
        return;
      }
      if (abandonIfUnmounted()) {
        stopTracks();
        return;
      }
      safeCloseLandmarker(landmarkerRef.current);
      landmarkerRef.current = landmarker;

      const video = videoRef.current;
      if (!video) {
        throw new Error("El elemento de video no está disponible.");
      }
      video.srcObject = stream;
      video.playsInline = true;
      video.muted = true;
      await video.play();
      if (superseded()) {
        stopTracks();
        safeCloseLandmarker(landmarker);
        landmarkerRef.current = null;
        return;
      }
      if (abandonIfUnmounted()) {
        stopTracks();
        return;
      }
      setPhase("ready");
    } catch (e) {
      if (superseded()) {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }
        if (landmarker) {
          safeCloseLandmarker(landmarker);
        }
        if (landmarkerRef.current === landmarker) {
          landmarkerRef.current = null;
        }
        return;
      }
      const message = formatStartError(e);
      if (mountedRef.current) {
        setErrorText(message);
        setPhase("error");
      }
      stopTracks();
      safeCloseLandmarker(landmarker);
      safeCloseLandmarker(landmarkerRef.current);
      landmarkerRef.current = null;
    }
  }, [stopTracks]);

  useEffect(() => {
    if (phase !== "ready") {
      return;
    }
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !landmarker) {
      return;
    }
    let cancelled = false;
    let rafId = 0;
    const tick = () => {
      if (cancelled) {
        return;
      }
      if (video.readyState >= 2) {
        const result = landmarker.detectForVideo(video, performance.now());
        const { landmarks } = result;
        if (landmarks.length >= 2) {
          const a = landmarks[0][MIDDLE_FINGER_MCP];
          const b = landmarks[1][MIDDLE_FINGER_MCP];
          const d = distance2d(a, b);
          targetSpreadRef.current = normalizeDistance(
            d,
            MIN_HAND_SPAN,
            MAX_HAND_SPAN,
          );
        } else {
          targetSpreadRef.current = lerp(
            targetSpreadRef.current,
            DEFAULT_SPREAD,
            SINGLE_HAND_DECAY,
          );
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [phase]);

  return (
    <div className="flex w-full flex-col gap-5">
      <p
        className="text-sm leading-relaxed text-zinc-400"
        aria-live="polite"
        role="status"
      >
        {statusMessage(phase, errorText)}
      </p>

      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
        {canvasReady ? (
          <Canvas
            className="h-full w-full"
            camera={{ position: [0, 0, 6.5], fov: 48 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "default",
              stencil: false,
            }}
          >
            <color attach="background" args={["#09090b"]} />
            <ambientLight intensity={0.55} />
            <directionalLight position={[5, 8, 6]} intensity={1.2} />
            <directionalLight position={[-4, -2, -2]} intensity={0.3} />
            <SphereScene targetSpreadRef={targetSpreadRef} />
          </Canvas>
        ) : (
          <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-2 bg-zinc-950 px-4 text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/30 to-zinc-800 ring-1 ring-white/10" />
            <p className="text-xs text-zinc-500">
              {phase === "ready"
                ? "Preparando visor 3D…"
                : "La esfera aparecerá al iniciar la cámara."}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative h-36 w-full max-w-xs overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 sm:h-28">
          <video
            ref={videoRef}
            className="h-full w-full scale-x-[-1] object-cover"
            playsInline
            muted
            width={640}
            height={480}
          />
          {phase !== "ready" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 text-xs text-zinc-500">
              {phase === "loading" ? "Iniciando…" : "Vista previa"}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={startExperience}
          disabled={phase === "loading"}
          className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {phase === "loading" ? "Cargando…" : "Iniciar cámara"}
        </button>
      </div>
    </div>
  );
}
