/**
 * Math utility helpers.
 */

/** Clamp a number between a minimum and maximum value. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Calculate the average of an array of numbers. */
export function average(nums: number[]): number {
  // BUG: no guard for empty array — will return NaN (0 / 0)
  const sum = nums.reduce((acc, n) => acc + n, 0);
  return sum / nums.length;
}

/** Round a number to a specified number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Check if a number is within a given range (inclusive). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Generate a random integer between min (inclusive) and max (inclusive). */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
