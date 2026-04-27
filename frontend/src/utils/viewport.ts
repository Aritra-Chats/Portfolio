export type ViewportSize = {
  width: number;
  height: number;
};

/**
 * 1920 × 1080 — the reference viewport where the layout was authored.
 * Every "design value" in the codebase was measured / tuned at this size.
 */
const DESIGN_W = 1920;
const DESIGN_H = 1080;

/**
 * Returns a unified scale factor relative to the 1920 × 1080 design canvas.
 *
 * WHY THIS WORKS ACROSS ZOOM LEVELS
 * ──────────────────────────────────
 * `window.innerWidth` / `window.innerHeight` report *CSS viewport* dimensions,
 * which already account for browser zoom:
 *
 *   CSS viewport width = physical screen width ÷ (devicePixelRatio × browserZoom)
 *
 * So at 125 % zoom on a 1080 p monitor:
 *   CSS viewport = 1920 ÷ 1.25 = 1536 × 864
 *   → scale = min(1536/1920, 864/1080) = 0.80
 *   → a 168 px design value becomes 168 × 0.80 = 134.4 CSS px
 *   → rendered physically as 134.4 × 1.25 = 168 px  ✓ identical to 100 % zoom
 *
 * The same math holds for:
 *   • Different screen resolutions   (1280×720 → 0.667, 2560×1440 → 1.333)
 *   • OS display scaling             (HiDPI, Retina — already baked into CSS px)
 *   • Any combination of the above
 *
 * The smaller axis is used so neither dimension overflows.
 * Range is clamped to [0.30, 2.00] for extreme edge-cases.
 */
export function getViewportScale(viewport: ViewportSize): number {
  const sx = viewport.width  / DESIGN_W;
  const sy = viewport.height / DESIGN_H;
  return Math.max(0.30, Math.min(2.00, Math.min(sx, sy)));
}

/**
 * Scales a pixel value that was designed / measured at 1920 × 1080 to the
 * current viewport.  Shorthand for:  designValue × getViewportScale(viewport)
 */
export function scaleFromDesign(viewport: ViewportSize, designValue: number): number {
  return designValue * getViewportScale(viewport);
}

// ── Legacy helpers kept for callers that still use ratio-based sizing ───────

type Clamp = { min?: number; max?: number };

function clamp(value: number, min?: number, max?: number): number {
  if (typeof min === 'number') value = Math.max(min, value);
  if (typeof max === 'number') value = Math.min(max, value);
  return value;
}

/**
 * Converts a viewport ratio into a pixel value, with optional clamping.
 * ratio 0.1 on axis "y" = 10 % of viewport height.
 */
export function adaptiveViewportValue(
  viewport: ViewportSize,
  axis: 'x' | 'y',
  ratio: number,
  options: Clamp = {}
): number {
  const basis = axis === 'x' ? viewport.width : viewport.height;
  return clamp(basis * ratio, options.min, options.max);
}
