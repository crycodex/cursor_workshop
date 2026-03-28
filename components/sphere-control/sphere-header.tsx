"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sphereControlContent } from "@/constants/content";

const HERO_SOLID_AFTER_VH = 0.88;

export function SphereHeader() {
  const { brand, nav } = sphereControlContent;
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = (): void => {
      const threshold = window.innerHeight * HERO_SOLID_AFTER_VH;
      setPastHero(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ease-out ${
        pastHero
          ? "border-b border-zinc-200/80 bg-white/90 text-zinc-900 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80"
          : "border-b border-transparent bg-black/25 text-white backdrop-blur-md supports-[backdrop-filter]:bg-black/15"
      }`}
    >
      <div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className={`font-syne text-lg font-semibold tracking-tight transition ${
              pastHero
                ? "text-zinc-900 hover:text-zinc-700"
                : "text-white hover:text-white/85"
            }`}
          >
            {brand.name}
          </Link>
          <Link
            href="/taller"
            className={`hidden text-sm font-medium transition sm:inline ${
              pastHero
                ? "text-zinc-500 hover:text-zinc-800"
                : "text-white/55 hover:text-white"
            }`}
          >
            Cursor Quito
          </Link>
        </div>
        <Link
          href={nav.ctaHref}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 active:scale-[0.98]"
        >
          {nav.ctaLabel}
        </Link>
      </div>
    </header>
  );
}
