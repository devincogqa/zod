/**
 * Number utility helpers for Zod numeric validations.
 */

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Check whether a number is within a given range (inclusive).
 *
 * BUG: uses strict less-than instead of less-than-or-equal for the upper bound,
 * so `isInRange(10, 1, 10)` incorrectly returns false.
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/**
 * Round a number to a given number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Return the percentage of `part` relative to `total`.
 */
export function toPercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}
