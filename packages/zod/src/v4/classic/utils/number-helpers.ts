/**
 * Number utility helpers for common numeric validation and operations.
 */

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Check if a number is within a given range (inclusive).
 *
 * BUG: Uses strict less-than instead of less-than-or-equal for the upper bound,
 * making the range exclusive on the upper end despite the doc saying "inclusive".
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value < max;
}

/**
 * Round a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Calculate the average of an array of numbers.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate average of an empty array");
  }
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Check if a number is a valid port number (1-65535).
 */
export function isValidPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/**
 * Convert a numeric value to its ordinal string representation.
 * e.g., 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 4 -> "4th"
 */
export function toOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${n}${suffix}`;
}
