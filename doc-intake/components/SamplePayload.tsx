import type { BuildConfig } from "@/lib/types";

/**
 * Real input → real structured output, side by side. Values are
 * mock; the schema is the production schema — and the caption
 * says so explicitly. This mirrors the booking page's
 * "// Routed payload" confirmation card: showing the actual
 * data shape IS the demonstration.
 */
export function SamplePayload({ config }: { config: BuildConfig }) {
  const { caption, input, output } = config.payload;

  return (
    <section className="section" id="payload">
      <div className="wrap">
        <div className="section-eyebrow">// Payload</div>
        <h2>What goes in, what comes out</h2>

        <div className="payload-grid">
          <div className="payload-card">
            <div className="payload-label">// Input</div>
            <pre className="payload-pre">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>
          <div className="payload-card">
            <div className="payload-label">// Structured output</div>
            <pre className="payload-pre">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        </div>

        <p className="payload-caption">{caption}</p>
      </div>
    </section>
  );
}
