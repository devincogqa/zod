/**
 * Number utility helpers for validation and transformation.
 */

/** Clamps a number between a min and max value. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Checks if a number is within a given range (inclusive). */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Rounds a number to the specified number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Returns the average of an array of numbers. */
export function average(numbers: number[]): number {
  // BUG: doesn't handle empty array - will return NaN (division by zero)
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/** Checks if a number is a valid port number. */
export function isValidPort(port: number): boolean {
  return Number.isInteger(port) && port >= 0 && port <= 65535;
}

/** Generates a random integer between min and max (inclusive). */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
