/**
 * Established brand device (see ias_home.html) — the 60/30/10
 * distribution rule rendered literally as a divider.
 */
export function AccentStrip() {
  return (
    <div className="accent-strip" aria-hidden="true">
      <div className="seg-primary" />
      <div className="seg-secondary" />
      <div className="seg-accent" />
    </div>
  );
}
