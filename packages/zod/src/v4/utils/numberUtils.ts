/**
 * Number utility functions for schema validation.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a number is within a given range (inclusive).
 * BUG: Uses || instead of && - will always return true for any number
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min || value <= max;
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns true if the value is a finite number (not NaN or Infinity).
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Calculates the percentage of a value relative to a total.
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}
