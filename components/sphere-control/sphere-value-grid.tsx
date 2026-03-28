"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sphereControlContent } from "@/constants/content";
import { ScrollSection } from "./scroll-section";

export function SphereValueGrid() {
  const reduceMotion = useReducedMotion();
  const { valueGrid } = sphereControlContent;
  return (
    <ScrollSection
      id={valueGrid.id}
      className="border-b border-zinc-200/90 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {valueGrid.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            {valueGrid.subtitle}
          </p>
        </div>
        <ol className="mt-14 divide-y divide-zinc-200/90 border-t border-zinc-200/90">
          {valueGrid.items.map((item, index) => {
            const inner = (
              <div className="grid gap-3 py-9 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-12 sm:py-10">
                <h3 className="font-sans text-lg font-semibold text-zinc-900 sm:pt-0.5">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
            if (reduceMotion) {
              return (
                <li key={item.title}>{inner}</li>
              );
            }
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {inner}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </ScrollSection>
  );
}
