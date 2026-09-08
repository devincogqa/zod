/**
 * Number utility functions for common numeric validation and transformation operations.
 */

/**
 * Clamps a number to be within a specified range.
 * @param value - The number to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a number is within a given range (inclusive).
 * @param value - The number to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns true if value is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param value - The number to round
 * @param decimals - Number of decimal places
 * @returns The rounded number
 */
export function roundTo(value: number, decimals: number): number {
  if (decimals < 0) {
    throw new Error("decimals must be non-negative");
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Calculates the average of an array of numbers.
 * @param numbers - Array of numbers
 * @returns The arithmetic mean
 * @throws Error if the array is empty
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate average of empty array");
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Checks if a value is a safe integer (within JavaScript's safe integer range).
 * @param value - The number to check
 * @returns true if the value is a safe integer
 */
export function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value);
}
