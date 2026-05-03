/**
 * Math utility helpers for common numerical operations.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot compute average of an empty array");
  }
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Returns the median value of a number array.
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot compute median of an empty array");
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Checks if a number is within a given range (inclusive).
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
