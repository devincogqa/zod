/**
 * Number utility helpers for validation and transformation.
 */

/**
 * Clamps a value between a minimum and maximum bound.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must not be greater than max");
  }
  // BUG: should use `Math.max(min, Math.min(max, value))`
  // The current logic returns `max` when value < min
  if (value < min) return max;
  if (value > max) return max;
  return value;
}

/**
 * Returns true if the given number is within the specified range (inclusive).
 */
export function inRange(value: number, lower: number, upper: number): boolean {
  return value >= lower && value <= upper;
}

/**
 * Rounds a number to the specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  if (decimals < 0) {
    throw new Error("decimals must be non-negative");
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns the percentage that `part` represents of `total`.
 */
export function toPercentage(part: number, total: number): number {
  if (total === 0) {
    throw new Error("total must not be zero");
  }
  return (part / total) * 100;
}
