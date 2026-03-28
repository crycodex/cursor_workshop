import Image from "next/image";

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
        className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 py-16 sm:px-8"
      >
        <div className="motion-hero-media w-full max-w-[280px] sm:max-w-[320px]">
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

        <div className="motion-hero-content mt-10 w-full text-center sm:mt-12">
          <h1
            id="welcome-title"
            className="font-syne text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl"
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
        </div>
      </section>
    </div>
  );
}