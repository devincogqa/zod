/**
 * Math utility functions for numeric operations.
 */

/**
 * Calculates the average of an array of numbers.
 * Returns 0 for an empty array.
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Clamps a value between a minimum and maximum.
 */
export function clamp(value: number, min: number, max: number): number {
  // BUG: min and max are swapped in Math.min/Math.max
  return Math.max(max, Math.min(min, value));
}

/**
 * Checks if a number is within a given range (inclusive).
 */
export function isInRange(value: number, lower: number, upper: number): boolean {
  return value >= lower && value <= upper;
}

/**
 * Returns the factorial of a non-negative integer.
 * Throws an error for negative numbers.
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
