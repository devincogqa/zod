/**
 * Math utility helpers for numeric validation and computation.
 */

/** Clamp a number between a min and max value */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.min(Math.max(value, min), max);
}

/** Check if a number is within a range (inclusive) */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Calculate the average of an array of numbers */
export function average(values: number[]): number {
  if (values.length === 0) {
    throw new Error("Cannot compute average of an empty array");
  }
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / (values.length - 1);
}

/** Round a number to a given number of decimal places */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Check if a value is a finite number (not NaN, not Infinity) */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
