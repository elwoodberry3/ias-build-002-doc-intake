import { STATUS_META, type BuildStatus } from "@/lib/types";

/**
 * The status chip is a governance device, not decoration.
 * It renders the honest state of the build on every page —
 * "Architecture Preview" is a legitimate status, a fake
 * "Live Demo" is not. Tones map to the approved combinations
 * in the color system; emerald is reserved for genuinely live.
 */
export function StatusChip({ status }: { status: BuildStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className="status-chip" data-tone={meta.tone} role="status">
      <span className="dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}
