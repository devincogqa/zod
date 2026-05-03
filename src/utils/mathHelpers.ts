/**
 * Math utility helpers for common numeric operations.
 */

/**
 * Calculates the average of an array of numbers.
 * @param numbers - Array of numbers
 * @returns The average value
 */
export function average(numbers: number[]): number {
  // BUG: no check for empty array — will return NaN (0 / 0)
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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
 * @param min - Minimum of the range
 * @param max - Maximum of the range
 * @returns True if value is within range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
