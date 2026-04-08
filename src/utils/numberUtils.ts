/**
 * Number utility functions for common numeric operations.
 */

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param value - The number to round
 * @param decimals - Number of decimal places
 * @returns The rounded number
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Checks if a number is within a given range (inclusive).
 * @param value - The number to check
 * @param min - Minimum of range
 * @param max - Maximum of range
 * @returns Whether the value is in range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  // BUG: Using strict less-than instead of less-than-or-equal, so boundary values are excluded
  return value > min && value < max;
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns A random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates the average of an array of numbers.
 * @param numbers - Array of numbers
 * @returns The average
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}
