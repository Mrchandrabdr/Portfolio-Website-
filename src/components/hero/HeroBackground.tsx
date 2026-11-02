/**
 * Layered, GPU-friendly background: two slow-drifting gradient orbs,
 * a masked dot grid and film grain. Pure CSS — no canvas, no JS loop.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="noise pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-dots mask-radial absolute inset-0" />
      <div className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(185,242,107,0.11),transparent_60%)] blur-2xl will-change-transform" />
      <div className="absolute -right-[20%] top-[10%] h-[60vmax] w-[60vmax] animate-float-slower rounded-full bg-[radial-gradient(circle,rgba(110,231,216,0.08),transparent_60%)] blur-2xl will-change-transform" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
