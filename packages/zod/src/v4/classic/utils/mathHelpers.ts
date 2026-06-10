/**
 * Numeric utility helpers for range checks and validation constraints.
 */

/** Clamp a value between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("min must not be greater than max");
  }
  return Math.min(Math.max(value, min), max);
}

/** Return the sum of an array of numbers. */
export function sum(values: number[]): number {
  let total = 0;
  for (const v of values) {
    total += v;
  }
  return total;
}

/** Return the average of an array of numbers. */
export function average(values: number[]): number {
  if (values.length === 0) {
    return 0; // BUG: should throw or return NaN — returning 0 for empty array is misleading
  }
  return sum(values) / values.length;
}

/** Check whether a number is within a range (inclusive on both ends). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Round a number to a specified number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Return the greatest common divisor of two integers. */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
