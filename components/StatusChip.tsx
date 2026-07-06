/**
 * components/StatusChip.tsx — IAS build status indicator
 * ─────────────────────────────────────────────────────────────
 * Governance:
 *   Article VI  — Kinetic Emerald is reserved for genuinely
 *                 live demos only. "planned" renders honestly
 *                 dormant, never celebratory.
 *   Article IX  — An unknown status must never ship silently
 *                 and must never crash the page. It renders in
 *                 the visible TODO warning style instead.
 *   Article VIII — Status values are a closed union type, so
 *                 a typo in any build.config.ts fails `tsc`
 *                 at build time — before Vercel ever deploys.
 *
 * Upgrade path per build: "planned" → "preview" → "prototype"
 * → "live". One word in build.config.ts, push to main.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * The only legal build statuses. Import this into lib/types.ts:
 *
 *   import type { BuildStatus } from "@/components/StatusChip";
 *   export interface BuildConfig { status: BuildStatus; ... }
 *
 * With that in place, `tsc --noEmit` rejects any config carrying
 * an invalid status — the strongest guarantee for a static
 * export, where a runtime crash means a broken public page.
 */
export type BuildStatus = "planned" | "preview" | "prototype" | "live";

/** Visual tone → CSS hook. Styled via [data-tone] selectors. */
type ChipTone = "neutral" | "info" | "warn" | "accent" | "todo";

interface StatusMeta {
  label: string;
  tone: ChipTone;
  /** Screen-reader expansion — the chip label alone is terse. */
  srText: string;
}

const STATUS_META: Record<BuildStatus, StatusMeta> = {
  planned: {
    label: "Planned",
    tone: "neutral", // muted gray — honestly dormant
    srText: "Build status: planned. Scoped, not yet in development.",
  },
  preview: {
    label: "Preview",
    tone: "info", // Muted Seafoam family — work exists, not live
    srText: "Build status: preview. Working prototype exists; demo not yet public.",
  },
  prototype: {
    label: "Prototype",
    tone: "warn", // amber — functional, pre-hardening
    srText: "Build status: prototype. Functional end to end; not production-hardened.",
  },
  live: {
    label: "Live",
    tone: "accent", // Kinetic Emerald — genuinely live demos ONLY
    srText: "Build status: live. Public working demo available.",
  },
};

/**
 * Runtime fallback — defense in depth behind the union type.
 *
 * The type system stops bad statuses at build time, but this
 * component may also receive data that bypassed tsc (CMS field,
 * fetched JSON, a config cast with `as`). Per Article IX, that
 * failure mode must be loud and visible, not a crashed page:
 * the chip renders in the TODO warning style, naming the bad
 * value so it cannot be missed in review.
 */
function resolveMeta(status: string): StatusMeta {
  if (status in STATUS_META) {
    return STATUS_META[status as BuildStatus];
  }
  return {
    label: `TODO: unknown status "${status}"`,
    tone: "todo",
    srText: `Build status unresolved. Received unknown value: ${status}.`,
  };
}

export interface StatusChipProps {
  /**
   * Typed as string, not BuildStatus, deliberately: this
   * component is the safety net, so it must accept — and
   * visibly flag — values the type system never saw.
   */
  status: string;
}

export function StatusChip({ status }: StatusChipProps) {
  const meta = resolveMeta(status);

  return (
    <span
      className="status-chip"
      data-tone={meta.tone}
      role="status"
      aria-label={meta.srText}
      title={meta.srText}
    >
      <span className="dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

/**
 * Dual export — the template's Hero imports `{ StatusChip }` (named);
 * a default-only export resolves that binding to `undefined` and
 * crashes RSC serialization ("Unsupported Server Component type:
 * undefined"). Both import styles must resolve. Never ship this
 * component as default-only.
 */
export default StatusChip;

/* ─────────────────────────────────────────────────────────────
 * Companion tone styles — merge into globals.css if these
 * [data-tone] hooks aren't already defined. Tokens per the IAS
 * color system; Kinetic Emerald appears in exactly one place.
 *
 * .status-chip[data-tone="neutral"] {
 *   color: var(--ias-muted, #6B7280);
 *   border-color: var(--ias-mid, #E5E7EB);
 * }
 * .status-chip[data-tone="neutral"] .dot { background: var(--ias-muted, #6B7280); }
 *
 * .status-chip[data-tone="info"] {
 *   color: var(--ias-secondary, #3F7266);
 *   border-color: color-mix(in srgb, var(--ias-secondary, #3F7266) 35%, transparent);
 * }
 * .status-chip[data-tone="info"] .dot { background: var(--ias-secondary, #3F7266); }
 *
 * .status-chip[data-tone="warn"] {
 *   color: #92600A;
 *   border-color: rgba(217, 158, 46, 0.45);
 * }
 * .status-chip[data-tone="warn"] .dot { background: #D99E2E; }
 *
 * .status-chip[data-tone="accent"] {
 *   color: #085041;
 *   border-color: rgba(0, 229, 163, 0.45);
 *   background: rgba(0, 229, 163, 0.10);
 * }
 * .status-chip[data-tone="accent"] .dot { background: var(--ias-accent, #00E5A3); }
 *
 * .status-chip[data-tone="todo"] {
 *   color: #991B1B;
 *   border-color: rgba(229, 72, 77, 0.5);
 *   background: rgba(229, 72, 77, 0.08);
 * }
 * .status-chip[data-tone="todo"] .dot { background: #E5484D; }
 * ───────────────────────────────────────────────────────────── */
