"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollSectionProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
};

export function ScrollSection({ children, className, id }: ScrollSectionProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
