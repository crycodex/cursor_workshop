import Link from "next/link";
import { ManosDynamicExperience } from "@/components/manos-dynamic-experience";
import { DarkPageBackdrop } from "@/components/layout/dark-page-backdrop";
import { manosPageContent } from "@/constants/content";

export default function ManosPage() {
  const { pageTitle, titleGradientPart, subtitle, stackPills } =
    manosPageContent;
  const [beforeAccent, afterAccent] = (() => {
    const idx = pageTitle.toLowerCase().indexOf(titleGradientPart);
    if (idx === -1) {
      return [pageTitle, ""];
    }
    return [
      pageTitle.slice(0, idx),
      pageTitle.slice(idx + titleGradientPart.length),
    ];
  })();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-50">
      <DarkPageBackdrop />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
          >
            ← Inicio
          </Link>
          <Link
            href="/sphere-control"
            className="text-xs font-medium text-violet-400/90 transition hover:text-violet-300 sm:text-sm"
          >
            Sphere Control
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-syne text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {beforeAccent}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {titleGradientPart}
            </span>
            {afterAccent}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack técnico">
            {stackPills.map((pill) => (
              <li key={pill}>
                <span className="inline-flex rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-400">
                  {pill}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/25 p-4 ring-1 ring-white/5 sm:p-6">
          <ManosDynamicExperience />
        </div>
      </div>
    </div>
  );
}
