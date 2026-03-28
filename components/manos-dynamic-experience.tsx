"use client";

import dynamic from "next/dynamic";

const HandSphereExperience = dynamic(
  () =>
    import("@/components/hand-sphere-experience").then((m) => ({
      default: m.HandSphereExperience,
    })),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-zinc-500" role="status" aria-live="polite">
        Cargando visor 3D…
      </p>
    ),
  },
);

export function ManosDynamicExperience() {
  return <HandSphereExperience />;
}
