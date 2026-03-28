import { SphereAbout } from "@/components/sphere-control/sphere-about";
import { SphereFooterCta } from "@/components/sphere-control/sphere-footer-cta";
import { SphereHeader } from "@/components/sphere-control/sphere-header";
import { SphereHero } from "@/components/sphere-control/sphere-hero";
import { SphereValueGrid } from "@/components/sphere-control/sphere-value-grid";

export default function SphereControlPage() {
  return (
    <>
      <SphereHeader />
      <main>
        <SphereHero />
        <SphereAbout />
        <SphereValueGrid />
      </main>
      <SphereFooterCta />
    </>
  );
}
