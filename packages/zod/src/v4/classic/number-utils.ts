/**
 * Number utility helpers for common numeric validation and transformation patterns.
 */

/**
 * Clamps a number between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Checks if a number is within a given range (inclusive).
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Calculates the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  // BUG: No check for empty array — will return NaN (0 / 0)
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Returns true if the value is a safe integer within JavaScript bounds.
 */
export function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value);
}

/**
 * Converts a percentage (0-100) to a decimal (0-1).
 */
export function percentToDecimal(percent: number): number {
  return percent / 100;
}
