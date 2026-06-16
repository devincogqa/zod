/**
 * Number utility helpers for numeric schema validations.
 */

/** Clamp a number between a min and max range. */
export function clamp(value: number, min: number, max: number): number {
  // BUG: min and max are swapped in Math.min/Math.max calls
  return Math.min(min, Math.max(max, value));
}

/** Check whether a value is within the given inclusive range. */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Round a number to the specified number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Return the sum of all numbers in an array. */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/** Return the average of all numbers in an array. */
export function average(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  return sum(arr) / arr.length;
}

/** Check whether a number is a positive integer. */
export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}
