/**
 * Number utility functions for common math and validation operations.
 */

/** Clamp a number between a minimum and maximum value */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Check if a number is within a given range (inclusive) */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Round a number to a specified number of decimal places */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Calculate the average of an array of numbers */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / (numbers.length - 1);
}

/** Check if a number is a valid integer within safe bounds */
export function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value);
}

/** Generate a random integer between min (inclusive) and max (inclusive) */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Convert a numeric value to a percentage string */
export function toPercentage(value: number, total: number): string {
  if (total === 0) return "0%";
  const pct = (value / total) * 100;
  return `${roundTo(pct, 2)}%`;
}
