import { sphereControlContent } from "@/constants/content";
import { ScrollSection } from "./scroll-section";

export function SphereAbout() {
  const { about, brand } = sphereControlContent;
  return (
    <ScrollSection
      id={about.id}
      className="border-b border-zinc-200/90 bg-zinc-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_1fr] lg:gap-20 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-violet-600/90">
              {brand.name}
            </p>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl sm:leading-tight">
              {about.title}
            </h2>
          </div>
          <div className="space-y-6 border-l border-zinc-200/80 pl-6 sm:pl-8 lg:border-l-0 lg:pl-0">
            {about.paragraphs.map((p, i) => (
              <p
                key={`about-p-${i}`}
                className="text-base leading-[1.7] text-zinc-600 sm:text-[1.0625rem]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
