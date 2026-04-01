/**
 * Utility helpers for common Zod operations.
 * @module
 */

/**
 * Check if a value is a non-empty string after trimming whitespace.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Check if a value is a positive integer.
 */
export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}
