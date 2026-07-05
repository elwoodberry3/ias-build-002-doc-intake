/* eslint-disable @next/next/no-img-element */
import type { BuildConfig } from "@/lib/types";
import { isTodo } from "@/lib/types";

/**
 * The Phase-1 "demonstrate" payload. Three parts:
 *   1. Optional diagram (real diagram or nothing — never a stock image)
 *   2. System map table — layer / technology / responsibility,
 *      same format as the Claims prototype scope document
 *   3. Numbered data flow — numbering is justified here because
 *      order IS the information
 */
export function Architecture({ config }: { config: BuildConfig }) {
  const { diagramSrc, diagramAlt, layers, flow } = config.architecture;

  return (
    <section className="section" id="architecture">
      <div className="wrap">
        <div className="section-eyebrow">// Architecture</div>
        <h2>How it&rsquo;s wired</h2>

        {diagramSrc ? (
          <div className="arch-diagram">
            <img src={diagramSrc} alt={diagramAlt} />
          </div>
        ) : null}

        <table className="arch-table">
          <thead>
            <tr>
              <th scope="col">LAYER</th>
              <th scope="col">TECHNOLOGY</th>
              <th scope="col">RESPONSIBILITY</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((row) => (
              <tr key={row.layer}>
                <td>{row.layer}</td>
                <td>
                  {isTodo(row.technology) ? (
                    <span className="todo-flag">{row.technology}</span>
                  ) : (
                    row.technology
                  )}
                </td>
                <td>
                  {isTodo(row.responsibility) ? (
                    <span className="todo-flag">{row.responsibility}</span>
                  ) : (
                    row.responsibility
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ol className="flow-list" aria-label="Data flow, in order">
          {flow.map((step, i) => (
            <li key={i}>
              {isTodo(step) ? (
                <span className="todo-flag">{step}</span>
              ) : (
                <span>{step}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
