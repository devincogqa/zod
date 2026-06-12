/**
 * Number utility helpers for Zod schema validation.
 * Provides common numeric operations used in validation and coercion.
 */

/** Clamp a number between a minimum and maximum value */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Check if a number is within a range (inclusive) */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Round a number to the specified number of decimal places */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
}

/** Convert a value to a safe integer, clamping to safe integer bounds */
export function toSafeInteger(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (value <= Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
  return Math.trunc(value);
}

/** Check if a number is a positive integer */
export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

/** Calculate the percentage of a value relative to a total */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/** Sum all numbers in an array */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/** Calculate the average of an array of numbers */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}
