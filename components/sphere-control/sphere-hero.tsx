"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { sphereControlContent } from "@/constants/content";

export function SphereHero() {
  const reduceMotion = useReducedMotion();
  const { hero, routes } = sphereControlContent;
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/90">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:flex lg:min-h-[min(78vh,820px)] lg:items-center lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <motion.h1
            className="font-sans text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.headlinePrefix}{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
              {hero.headlineAccent}
            </span>{" "}
            {hero.headlineSuffix}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-relaxed text-zinc-600 sm:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={routes.demo}
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-violet-600/25 transition hover:scale-[1.02] hover:bg-violet-500 active:scale-[0.98]"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-8 py-3.5 text-base font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-white"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>
        </div>
        <div
          className="mt-14 flex flex-1 justify-center lg:mt-0 lg:justify-end"
          aria-hidden
        >
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-transparent ring-1 ring-violet-500/20" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-zinc-100 to-white shadow-inner ring-1 ring-zinc-200/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-90 shadow-xl shadow-violet-600/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
