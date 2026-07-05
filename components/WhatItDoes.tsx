import type { BuildConfig } from "@/lib/types";
import { isTodo } from "@/lib/types";

/**
 * Renders the whatItDoes paragraphs. Any paragraph still starting
 * with "TODO:" renders as a visible flag — the fabrication
 * prohibition made structural. A build page with an unfilled
 * TODO announces itself instead of quietly shipping filler.
 */
export function WhatItDoes({ config }: { config: BuildConfig }) {
  return (
    <section className="section" id="what-it-does">
      <div className="wrap">
        <div className="section-eyebrow">// What it does</div>
        <h2>The problem this build removes</h2>
        {config.whatItDoes.map((para, i) =>
          isTodo(para) ? (
            <p key={i}>
              <span className="todo-flag">{para}</span>
            </p>
          ) : (
            <p key={i}>{para}</p>
          ),
        )}
      </div>
    </section>
  );
}
