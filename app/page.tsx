import Image from "next/image";
import Link from "next/link";
import { HomeFeatureGrid } from "@/components/home/home-feature-grid";
import { HomeStickyNav } from "@/components/home/home-sticky-nav";
import { DarkPageBackdrop } from "@/components/layout/dark-page-backdrop";
import { homePageContent } from "@/constants/content";

export default function Home() {
  const { workshop, sphereHighlight, featuresSection, bottomNote } =
    homePageContent;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-50">
      <DarkPageBackdrop />
      <HomeStickyNav />

      <div className="relative z-10">
        <section
          aria-labelledby="welcome-title"
          className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14 lg:pt-4">
            <div className="motion-hero-media mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
                <Image
                  src="/hero-quito.png"
                  alt=""
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 280px, 300px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="motion-hero-content flex flex-col text-center lg:text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-violet-300/80">
                {sphereHighlight.eyebrow}
              </p>
              <h1
                id="welcome-title"
                className="mt-3 font-syne text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem]"
                aria-label={workshop.titleAriaLabel}
              >
                <span aria-hidden className="mr-1.5 inline-block">
                  ✨
                </span>
                {workshop.title}
              </h1>
              <p className="motion-hero-cta mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {workshop.description}{" "}
                <span aria-hidden className="inline-block">
                  🚀
                </span>
              </p>

              <div className="motion-hero-actions mt-8 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-left ring-1 ring-violet-500/10 backdrop-blur-sm">
                <h2 className="font-syne text-lg font-semibold text-zinc-100 sm:text-xl">
                  {sphereHighlight.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {sphereHighlight.description}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={sphereHighlight.primaryCta.href}
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:scale-[1.02] hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:flex-none"
                  >
                    {sphereHighlight.primaryCta.label}
                  </Link>
                  <Link
                    href={sphereHighlight.secondaryCta.href}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-white/25 hover:bg-white/10 sm:flex-none"
                  >
                    {sphereHighlight.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeFeatureGrid
          id={featuresSection.id}
          sectionTitle={featuresSection.title}
          sectionSubtitle={featuresSection.subtitle}
        />

        <section className="border-t border-white/5 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs leading-relaxed text-zinc-600">
              {bottomNote}
            </p>
            <p className="mt-4 text-center text-sm text-zinc-500">
              <Link
                href="/manos"
                className="font-medium text-violet-400 underline-offset-2 transition hover:text-violet-300 hover:underline"
              >
                Ir a la demo
              </Link>
              {" · "}
              <Link
                href="/sphere-control"
                className="font-medium text-violet-400 underline-offset-2 transition hover:text-violet-300 hover:underline"
              >
                Ver landing Sphere Control
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
