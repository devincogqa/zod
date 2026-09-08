/**
 * Number utility helpers for Zod schema validation
 */

/**
 * Clamps a number between min and max values
 * BUG: min and max are swapped in the Math.min/Math.max calls
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(max, Math.min(min, value)); // BUG: should be Math.min(max, Math.max(min, value))
}

/**
 * Checks if a number is within a range (inclusive)
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds a number to a specific number of decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Returns the ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Checks if a value is a safe integer
 */
export function isSafeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}
