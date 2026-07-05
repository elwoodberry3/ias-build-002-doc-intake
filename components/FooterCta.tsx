import type { BuildConfig } from "@/lib/types";

/**
 * Every build page ends at the same three doors: book a call
 * (consulting), read the code (employment), see the rest of the
 * portfolio (brand). One build, three doors — rendered literally.
 */
export function FooterCta({ config }: { config: BuildConfig }) {
  return (
    <footer className="footer-cta">
      <div className="wrap">
        <h2>Want this running in your operation?</h2>
        <p>
          Thirty minutes. You describe the manual process; I show you what
          the automated version looks like. No deck, no pitch — a working
          conversation.
        </p>

        <div className="footer-links">
          <a className="btn-primary" href={config.links.booking}>
            Book a call <span className="arrow">→</span>
          </a>
          <a
            className="btn-secondary"
            href={config.links.portfolio}
            rel="noopener noreferrer"
          >
            See all builds
          </a>
        </div>

        <div className="footer-base">
          <span>
            BUILD {config.buildNumber} · {config.name.toUpperCase()}
          </span>
          <span>
            <a href={config.links.github} rel="noopener noreferrer">
              GitHub
            </a>
            {" · "}
            <a href={config.links.portfolio} rel="noopener noreferrer">
              iautomateshit
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
