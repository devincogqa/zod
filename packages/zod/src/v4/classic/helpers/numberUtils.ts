/** Number utility helpers for numeric schema validation. */

/**
 * Clamp a number between a minimum and maximum value (inclusive).
 * Returns `min` if `value < min`, `max` if `value > max`, otherwise `value`.
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Check whether a number is within a range (inclusive on both ends). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Round a number to the given number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Return true if the value is a finite integer. */
export function isFiniteInteger(value: number): boolean {
  return Number.isFinite(value) && Number.isInteger(value);
}

/**
 * Parse a numeric string, returning the parsed number or `undefined`
 * if the string does not represent a valid finite number.
 */
export function parseNumeric(str: string): number | undefined {
  const num = Number(str);
  return Number.isFinite(num) ? num : undefined;
}
