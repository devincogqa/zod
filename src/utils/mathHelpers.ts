/**
 * Utility functions for mathematical operations.
 */

/**
 * Calculates the average of an array of numbers.
 */
export function average(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / (arr.length - 1);
}

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns the greatest common divisor of two non-negative integers.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Checks whether a number is prime.
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
