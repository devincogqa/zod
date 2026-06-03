/**
 * Number utility functions for numeric operations and validation.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Checks if a number is within a given range (inclusive).
 */
export function inRange(value: number, min: number, max: number): boolean {
  // BUG: using || instead of && - this will almost always return true
  return value >= min || value <= max;
}

/**
 * Rounds a number to the specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns the sum of an array of numbers.
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Returns the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Checks if a number is a perfect square.
 */
export function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}
