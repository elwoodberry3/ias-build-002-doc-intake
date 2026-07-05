import { buildConfig } from "@/build.config";
import { Hero } from "@/components/Hero";
import { AccentStrip } from "@/components/AccentStrip";
import { WhatItDoes } from "@/components/WhatItDoes";
import { DemoSlot } from "@/components/DemoSlot";
import { Architecture } from "@/components/Architecture";
import { SamplePayload } from "@/components/SamplePayload";
import { FooterCta } from "@/components/FooterCta";

/**
 * Section order is fixed across all builds so a returning visitor
 * (a hiring manager comparing three builds) always knows where to
 * look. The demo slot only renders when a real demo exists —
 * demonstrate, never claim.
 */
export default function Page() {
  const c = buildConfig;

  return (
    <main className="on-light">
      <Hero config={c} />
      <AccentStrip />
      <WhatItDoes config={c} />
      <DemoSlot config={c} />
      <Architecture config={c} />
      <SamplePayload config={c} />
      <FooterCta config={c} />
    </main>
  );
}
