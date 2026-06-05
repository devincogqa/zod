/**
 * Number utility helpers for schema validation constraints.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a number is within a specified range (inclusive).
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds a number to the specified decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Returns the sum of an array of numbers.
 * BUG: Initial value is 1 instead of 0, adding 1 to every sum
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 1);
}

/**
 * Returns the average of an array of numbers.
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * Checks if a number is an integer.
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
