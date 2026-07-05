import type { BuildConfig } from "@/lib/types";

/**
 * Demo slot governance: this section renders ONLY when a real
 * demo asset exists (an embeddable route or a recorded
 * walkthrough). No mock-up is ever presented as live. When the
 * build reaches demo-ready state, set demo.embedUrl or
 * demo.videoUrl in build.config.ts and this section appears.
 */
export function DemoSlot({ config }: { config: BuildConfig }) {
  const { embedUrl, videoUrl, note } = config.demo;

  if (!embedUrl && !videoUrl) return null;

  return (
    <section className="section" id="demo">
      <div className="wrap">
        <div className="section-eyebrow">// Demo</div>
        <h2>See it run</h2>
        <div className="demo-frame">
          <iframe
            src={embedUrl ?? videoUrl ?? undefined}
            title={`${config.name} — demo`}
            loading="lazy"
            allow="fullscreen"
          />
        </div>
        {note ? <p className="demo-note">{note}</p> : null}
      </div>
    </section>
  );
}
