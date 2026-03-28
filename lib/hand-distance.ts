/** Euclidean distance in normalized image space (x, y). */
export function distance2d(
  a: { readonly x: number; readonly y: number },
  b: { readonly x: number; readonly y: number },
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Map a raw distance to [0, 1] using calibration bounds. */
export function normalizeDistance(
  raw: number,
  minDistance: number,
  maxDistance: number,
): number {
  if (maxDistance <= minDistance) {
    return 0.5;
  }
  return clamp01((raw - minDistance) / (maxDistance - minDistance));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
