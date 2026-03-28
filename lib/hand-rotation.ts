const WRIST = 0;
const MIDDLE_MCP = 9;

type Lm = { readonly x: number; readonly y: number; readonly z?: number };

/** Image X mirrored like the preview (selfie-left matches screen-left). */
function mirroredX(x: number): number {
  return 1 - x;
}

function handYawAndPitch(hand: readonly Lm[]): { yaw: number; pitch: number } {
  const wx = mirroredX(hand[WRIST].x);
  const wy = hand[WRIST].y;
  const mx = mirroredX(hand[MIDDLE_MCP].x);
  const my = hand[MIDDLE_MCP].y;
  const wz = hand[WRIST].z ?? 0;
  const mz = hand[MIDDLE_MCP].z ?? 0;
  const dx = mx - wx;
  const dy = my - wy;
  const dz = mz - wz;
  const planar = Math.hypot(dx, dy) || 1e-6;
  const yaw = Math.atan2(dy, dx);
  const pitch = Math.atan2(-dz, planar);
  return { yaw, pitch };
}

function unwrapDeltaRad(current: number, previous: number): number {
  let d = current - previous;
  if (d > Math.PI) {
    d -= Math.PI * 2;
  } else if (d < -Math.PI) {
    d += Math.PI * 2;
  }
  return d;
}

/**
 * Yaw/pitch of the palm in image space (circular mean of yaw when two hands).
 * Returns null if there are no hands.
 */
export function computeMeanHandOrientation(
  landmarks: readonly (readonly Lm[])[],
): { yaw: number; pitch: number } | null {
  if (landmarks.length === 0) {
    return null;
  }
  const parts = landmarks.map((h) => handYawAndPitch(h));
  if (parts.length === 1) {
    return parts[0];
  }
  const sy = parts.reduce((s, p) => s + Math.sin(p.yaw), 0);
  const cy = parts.reduce((s, p) => s + Math.cos(p.yaw), 0);
  const n = parts.length;
  const yaw = Math.atan2(sy / n, cy / n);
  const pitch = parts.reduce((s, p) => s + p.pitch, 0) / n;
  return { yaw, pitch };
}

export type HandOrientationState = {
  readonly yaw: number;
  readonly pitch: number;
};

/**
 * Integrate hand orientation deltas into globe rotation (radians).
 * Call each frame when `orientation` is non-null; pass null to clear the previous sample (e.g. hands lost).
 */
export function integrateHandGlobeRotation(
  orientation: HandOrientationState | null,
  previous: HandOrientationState | null,
  accum: { y: number; x: number },
  gainYaw: number,
  gainPitch: number,
  pitchClamp: number,
): HandOrientationState | null {
  if (orientation === null) {
    return null;
  }
  if (previous === null) {
    return orientation;
  }
  const dYaw = unwrapDeltaRad(orientation.yaw, previous.yaw);
  const dPitch = unwrapDeltaRad(orientation.pitch, previous.pitch);
  accum.y += dYaw * gainYaw;
  accum.x += dPitch * gainPitch;
  accum.x = Math.max(-pitchClamp, Math.min(pitchClamp, accum.x));
  return orientation;
}
