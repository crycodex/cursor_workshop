import { sphereControlContent } from "@/constants/content";
import { ScrollSection } from "./scroll-section";

export function SphereAbout() {
  const { about } = sphereControlContent;
  return (
    <ScrollSection
      id={about.id}
      className="border-b border-zinc-200/80 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {about.title}
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-zinc-600 lg:max-w-xl lg:justify-self-end">
            {about.paragraphs.map((p, i) => (
              <p key={`about-p-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
