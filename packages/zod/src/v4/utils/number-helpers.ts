/**
 * Number utility helpers for common math operations.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Checks if a number is within a given range (inclusive).
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/**
 * Returns the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
