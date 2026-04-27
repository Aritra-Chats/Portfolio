export type ViewportSize = {
  width: number;
  height: number;
};

type Clamp = {
  min?: number;
  max?: number;
};

function clamp(value: number, min?: number, max?: number) {
  if (typeof min === 'number') {
    value = Math.max(min, value);
  }
  if (typeof max === 'number') {
    value = Math.min(max, value);
  }
  return value;
}

/**
 * Converts a viewport ratio into a pixel value, with optional clamping.
 * Example: ratio -0.1 on axis "y" = -10% of viewport height.
 */
export function adaptiveViewportValue(
  viewport: ViewportSize,
  axis: 'x' | 'y',
  ratio: number,
  options: Clamp = {}
) {
  const basis = axis === 'x' ? viewport.width : viewport.height;
  return clamp(basis * ratio, options.min, options.max);
}
