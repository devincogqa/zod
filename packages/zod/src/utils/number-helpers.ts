/**
 * Number utility helpers for numeric validation and transformation.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a number is within a given range (inclusive).
 *
 * BUG: Uses strict less-than instead of less-than-or-equal for the upper bound,
 * so the range is actually [min, max) instead of [min, max].
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns true if the given number is an integer.
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/**
 * Converts a number to a percentage string.
 */
export function toPercentage(value: number, total: number): string {
  if (total === 0) return "0%";
  const pct = (value / total) * 100;
  return `${roundTo(pct, 2)}%`;
}
