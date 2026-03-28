import {
  Camera,
  Cpu,
  Hand,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { SphereValueIconId } from "@/constants/content";
import { sphereControlContent } from "@/constants/content";

const iconMap: Record<SphereValueIconId, LucideIcon> = {
  camera: Camera,
  hand: Hand,
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  cpu: Cpu,
};

type HomeFeatureGridProps = {
  readonly sectionTitle: string;
  readonly sectionSubtitle: string;
  readonly id: string;
};

export function HomeFeatureGrid({
  sectionTitle,
  sectionSubtitle,
  id,
}: HomeFeatureGridProps) {
  const { items } = sphereControlContent.valueGrid;
  return (
    <section
      id={id}
      className="relative border-t border-white/5 bg-zinc-900/20 py-16 sm:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-syne text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {sectionSubtitle}
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li key={item.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/50 p-5 ring-1 ring-white/5 transition duration-300 hover:border-violet-500/25 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-violet-950/20">
                  <div className="mb-4 inline-flex w-fit rounded-xl bg-violet-500/15 p-2.5 text-violet-300 ring-1 ring-violet-400/20">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-semibold text-zinc-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
