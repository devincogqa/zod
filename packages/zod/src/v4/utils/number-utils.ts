/**
 * Number utility functions for numeric validations and calculations.
 */

/** Clamps a value between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.min(Math.max(value, min), max);
}

/** Returns the average of an array of numbers. */
export function average(numbers: number[]): number {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/** Checks if a number is within a range (inclusive). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Rounds a number to the specified decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Returns the percentage of a value relative to a total. */
export function percentage(value: number, total: number): number {
  return (value / total) * 100;
}

/** Checks if a value is a finite number (not NaN, not Infinity). */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
