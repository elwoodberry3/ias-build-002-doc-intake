import type { BuildConfig } from "@/lib/types";
import { StatusChip } from "./StatusChip";

/**
 * 90-second rule: everything a hiring manager needs to place this
 * build — number, name, sector, honest status, what it is, where
 * the code lives — sits above the fold.
 */
export function Hero({ config }: { config: BuildConfig }) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-meta">
          <span className="build-badge">BUILD {config.buildNumber}</span>
          <span className="sector-tag">{config.sector}</span>
          <StatusChip status={config.status} />
        </div>

        <h1>{config.name}</h1>
        <p className="hero-tagline">{config.tagline}</p>

        <div className="hero-actions">
          <a className="btn-primary" href={config.links.booking}>
            Book a call <span className="arrow">→</span>
          </a>
          <a
            className="btn-secondary"
            href={config.links.github}
            rel="noopener noreferrer"
          >
            View the code on GitHub
          </a>
        </div>

        <div className="hero-stack" aria-label="Technology stack">
          {config.stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
