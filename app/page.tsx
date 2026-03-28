import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(255,255,255,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(255,255,255,0.04),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_90%,rgba(255,255,255,0.03),transparent_45%)]"
        aria-hidden
      />

      <section
        aria-labelledby="welcome-title"
        className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 py-16 sm:px-8 lg:py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <div className="motion-hero-media mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
              <Image
                src="/hero-quito.png"
                alt=""
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 280px, 320px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="motion-hero-content flex flex-col text-center lg:text-left">
            <h1
              id="welcome-title"
              className="font-syne text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem]"
              aria-label="Bienvenida o bienvenido a Cursor Quito"
            >
              <span aria-hidden className="mr-1.5 inline-block">
                ✨
              </span>
              Bienvenid@ a Cursor Quito
            </h1>
            <p className="motion-hero-cta mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              En unos minutos empezaremos a crear la página que vas a publicar. No
              necesitas experiencia previa: aquí aprenderás todo paso a paso.{" "}
              <span aria-hidden className="inline-block">
                🚀
              </span>
            </p>

            <div className="motion-hero-actions mt-10 flex flex-col items-stretch gap-4 sm:mt-12 lg:items-start">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 text-left ring-1 ring-white/5 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-violet-300/90">
                  Demo interactiva
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Controla una esfera en 3D con tus manos: sepáralas para agrandarla
                  o júntalas para encogerla. Usa la cámara y Three.js.
                </p>
                <Link
                  href="/manos"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto"
                >
                  Abrir demo de manos
                </Link>
              </div>
              <p className="text-center text-xs text-zinc-600 lg:text-left">
                Requiere permiso de cámara ·{" "}
                <Link
                  href="/manos"
                  className="text-zinc-500 underline-offset-2 transition hover:text-zinc-300 hover:underline"
                >
                  Ir a /manos
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
