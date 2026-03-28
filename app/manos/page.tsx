import Link from "next/link";
import { ManosDynamicExperience } from "@/components/manos-dynamic-experience";

export default function ManosPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(255,255,255,0.07),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 sm:px-8">
        <Link
          href="/"
          className="inline-flex text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          ← Volver al inicio
        </Link>
        <header className="mt-8">
          <h1 className="font-syne text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Esfera con tus manos
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-400">
            Usa las dos manos frente a la cámara: al separarlas la esfera crece y
            la vista se aleja; al juntarlas, se encoge y acerca.
          </p>
        </header>
        <div className="mt-10">
          <ManosDynamicExperience />
        </div>
      </div>
    </div>
  );
}
