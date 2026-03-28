import Link from "next/link";
import { homePageContent } from "@/constants/content";

export function HomeStickyNav() {
  const { stickyNav } = homePageContent;
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-syne text-sm font-semibold tracking-tight text-zinc-100"
        >
          {stickyNav.brand}
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 sm:gap-x-2"
          aria-label="Secciones principales"
        >
          {stickyNav.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100 sm:text-sm sm:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
