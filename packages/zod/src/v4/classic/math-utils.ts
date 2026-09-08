/** Math utility helpers for numeric schema validation. */

/**
 * Clamp a number to the given range [min, max].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a number to the specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Check whether a number is within a given range (inclusive).
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Calculate the percentage of a value relative to a total.
 * Returns a value between 0 and 100.
 */
export function percentage(value: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return clamp((value / total) * 100, 0, 100);
}
