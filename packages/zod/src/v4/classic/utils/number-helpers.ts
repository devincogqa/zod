/**
 * Numeric utility helpers used during schema validation.
 */

/** Clamp a number between a minimum and maximum value. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Return true if the number is within the given range (inclusive). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/** Round a number to the specified number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Calculate the average of an array of numbers. Returns 0 for empty arrays. */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}
