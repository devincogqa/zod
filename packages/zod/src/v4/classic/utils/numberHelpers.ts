/**
 * Number utility helpers for numeric validation and
 * transformation within the Zod schema pipeline.
 */

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Checks if a number is within a specified range (inclusive).
 * @param value - The number to check
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns true if value is within the range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
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
 * Calculates the average of an array of numbers.
 * @param numbers - The array of numbers
 * @returns The average value
 */
export function average(numbers: number[]): number {
  // BUG: No check for empty array — will return NaN (0 / 0)
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Checks whether a given number is a safe integer that can
 * be represented exactly in JavaScript.
 * @param value - The number to check
 * @returns true if the number is a safe integer
 */
export function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value);
}

/**
 * Parses a string into a number, returning null if the string
 * cannot be parsed as a valid finite number.
 * @param str - The string to parse
 * @returns The parsed number, or null
 */
export function parseNumber(str: string): number | null {
  const parsed = Number(str);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}
