/**
 * Utility functions for mathematical operations.
 */

/**
 * Calculates the average of an array of numbers.
 * BUG: Division by arr.length - 1 instead of arr.length,
 * causing incorrect average calculation (and division by zero for single-element arrays).
 */
export function average(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error("Cannot calculate average of an empty array");
  }
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns the greatest common divisor of two numbers.
 */
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

/**
 * Returns the factorial of a non-negative integer.
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
