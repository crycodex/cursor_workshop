"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { sphereControlContent } from "@/constants/content";

export function SphereFooterCta() {
  const reduceMotion = useReducedMotion();
  const { finalCta, footer } = sphereControlContent;
  return (
    <>
      <motion.section
        className="relative overflow-hidden bg-zinc-950 py-24 text-white sm:py-32"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(139,92,246,0.18),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
          <p className="font-syne text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            Siguiente paso
          </p>
          <h2 className="mt-4 max-w-xl font-sans text-3xl font-semibold tracking-tight sm:text-4xl sm:leading-tight">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {finalCta.description}
          </p>
          <Link
            href={finalCta.buttonHref}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
          >
            {finalCta.buttonLabel}
            <ArrowUpRight
              className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </motion.section>
      <footer className="border-t border-white/10 bg-zinc-950 py-14 text-zinc-500">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-12">
            <a
              href={`mailto:${footer.email}`}
              className="inline-flex items-center gap-2 text-sm transition hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {footer.email}
            </a>
            <a
              href={footer.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition hover:text-white"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
              {footer.whatsappDisplay}
            </a>
          </div>
          <a
            href={footer.socialHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            aria-label={footer.socialLabel}
          >
            <Globe className="h-4 w-4 shrink-0" aria-hidden />
            {footer.socialLabel}
          </a>
        </div>
        <p className="mt-12 px-4 text-center text-xs text-zinc-600 sm:px-8 lg:px-10">
          © {footer.copyrightYear} {footer.copyrightHolder}
        </p>
      </footer>
    </>
  );
}
