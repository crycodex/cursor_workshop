import Link from "next/link";
import { sphereControlContent } from "@/constants/content";

export function SphereHeader() {
  const { brand, nav } = sphereControlContent;
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/65">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/sphere-control"
          className="text-lg font-semibold tracking-tight text-zinc-900 transition hover:text-zinc-700"
        >
          {brand.name}
        </Link>
        <Link
          href={nav.ctaHref}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02] hover:bg-violet-500 active:scale-[0.98]"
        >
          {nav.ctaLabel}
        </Link>
      </div>
    </header>
  );
}
