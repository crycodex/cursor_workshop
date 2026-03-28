"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { sphereControlContent } from "@/constants/content";

export function SphereFooterCta() {
  const reduceMotion = useReducedMotion();
  const { finalCta, footer } = sphereControlContent;
  return (
    <>
      <motion.section
        className="bg-zinc-950 py-20 text-white sm:py-24"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {finalCta.description}
          </p>
          <Link
            href={finalCta.buttonHref}
            className="mt-10 inline-flex rounded-full bg-white px-8 py-3.5 text-base font-semibold text-zinc-950 transition hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98]"
          >
            {finalCta.buttonLabel}
          </Link>
        </div>
      </motion.section>
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
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
          <div className="flex items-center gap-5">
            <a
              href={footer.socialHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
              aria-label={footer.socialLabel}
            >
              <Globe className="h-4 w-4" aria-hidden />
              {footer.socialLabel}
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-zinc-600">
          © {footer.copyrightYear} {footer.copyrightHolder}
        </p>
      </footer>
    </>
  );
}
