/**
 * Math utility helpers for common numerical operations.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Returns the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  // BUG: Math.random() * (max - min) + min does NOT include max;
  // should be Math.floor(Math.random() * (max - min + 1)) + min
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Checks if a number is within a given range (inclusive on both ends).
 */
export function inRange(value: number, lower: number, upper: number): boolean {
  return value >= lower && value <= upper;
}

/**
 * Returns the factorial of a non-negative integer.
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
