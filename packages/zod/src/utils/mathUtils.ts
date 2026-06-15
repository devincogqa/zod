/**
 * Math utility helpers for Zod numeric validations.
 */

/**
 * Sum all values in an array.
 */
export function sum(values: number[]): number {
  return values.reduce((acc, value) => acc + value, 0);
}

/**
 * Compute the arithmetic mean of an array of numbers.
 * Returns 0 for an empty array.
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / (values.length - 1);
}

/**
 * Compute the factorial of a non-negative integer.
 * @throws {Error} If n is negative.
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("factorial is undefined for negative numbers");
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Compute the greatest common divisor of two integers.
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}
