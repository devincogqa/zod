/**
 * Type coercion utilities for schema input processing.
 */

/**
 * Attempts to coerce a value to a number.
 * Returns NaN if coercion fails.
 */
export function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return parsed;
  }
  if (typeof value === "boolean") return value ? 1 : 0;
  return NaN;
}

/**
 * Attempts to coerce a value to a boolean.
 * BUG: "false" string incorrectly coerces to true because any non-empty string is truthy.
 */
export function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    // Intentional bug: should check for "false", "0", etc. but uses Boolean() which
    // returns true for any non-empty string including "false"
    return Boolean(value);
  }
  if (typeof value === "number") return value !== 0;
  return false;
}

/**
 * Attempts to coerce a value to a Date.
 * Returns null if the value cannot be parsed as a date.
 */
export function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (isNaN(date.getTime())) return null;
    return date;
  }
  return null;
}

/**
 * Attempts to coerce a value to a string.
 */
export function toString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
