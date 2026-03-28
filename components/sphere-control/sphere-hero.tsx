"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { sphereControlContent } from "@/constants/content";

export function SphereHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.08],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, "12%"],
  );

  const { brand, hero, routes } = sphereControlContent;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-zinc-950"
      aria-labelledby="sphere-hero-heading"
    >
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ scale: imageScale, y: imageY }}
        aria-hidden
      >
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/25"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_50%,rgba(139,92,246,0.12),transparent_55%)]" aria-hidden />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:justify-center lg:px-14 lg:pb-24 lg:pt-20">
        <div className="max-w-xl">
          <motion.p
            className="font-syne text-xs font-semibold uppercase tracking-[0.22em] text-white/55"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {brand.name}
          </motion.p>
          <motion.p
            className="mt-3 text-sm text-white/50"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="sphere-hero-heading"
            className="mt-6 font-sans text-[2rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.headlinePrefix}{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent">
              {hero.headlineAccent}
            </span>{" "}
            {hero.headlineSuffix}
          </motion.h1>
          <motion.p
            className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg sm:leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={routes.demo}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/10"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
