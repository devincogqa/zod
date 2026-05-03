/**
 * Utility functions for common math operations.
 */

/** Clamp a number between a minimum and maximum value. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Calculate the average of an array of numbers. */
export function average(nums: number[]): number {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (nums.length === 0) return 0;
  return sum / nums.length;
}

/** Return the greatest common divisor of two integers. */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/** Return the least common multiple of two integers. */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}
