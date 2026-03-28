"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { ScrollSection } from "./scroll-section";

const iconMap: Record<SphereValueIconId, LucideIcon> = {
  camera: Camera,
  hand: Hand,
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  cpu: Cpu,
};

export function SphereValueGrid() {
  const reduceMotion = useReducedMotion();
  const { valueGrid } = sphereControlContent;
  return (
    <ScrollSection
      id={valueGrid.id}
      className="border-b border-zinc-200/80 bg-zinc-50/90 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {valueGrid.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600">{valueGrid.subtitle}</p>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueGrid.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const card = (
              <div className="group relative h-full rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:shadow-md hover:shadow-zinc-200/50">
                <div className="mb-4 inline-flex rounded-xl bg-violet-50 p-3 text-violet-600 ring-1 ring-violet-100 transition group-hover:bg-violet-100/80">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </div>
            );
            if (reduceMotion) {
              return (
                <li key={item.title}>{card}</li>
              );
            }
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {card}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </ScrollSection>
  );
}
