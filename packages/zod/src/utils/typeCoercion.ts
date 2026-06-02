/**
 * Type coercion utilities for converting between primitive types
 * during schema parsing and transformation.
 */

/**
 * Safely coerce a value to a number. Returns NaN for non-numeric values.
 */
export function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return Number.NaN;
    return Number(trimmed);
  }
  if (typeof value === "boolean") return value ? 1 : 0;
  return Number.NaN;
}

/**
 * Safely coerce a value to a boolean.
 * - "true", "1", "yes" → true
 * - "false", "0", "no" → false
 * - numbers: 0 → false, non-zero → true
 */
export function toBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim();
    if (["true", "1", "yes"].includes(lower)) return true;
    if (["false", "0", "no"].includes(lower)) return false;
    return null;
  }
  return null;
}

/**
 * Coerce a value to a string representation.
 */
export function coerceToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

/**
 * Check if two values are equal after coercion to a common type.
 */
export function looseEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  const numA = toNumber(a);
  const numB = toNumber(b);
  // biome-ignore lint/suspicious/noDoubleEquals: intentional loose comparison for coercion check
  if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA == numB;
  return coerceToString(a) === coerceToString(b);
}

/**
 * Attempt to coerce a value to a Date. Returns null if the value
 * cannot be reasonably interpreted as a date.
 */
export function toDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

/**
 * Coerce a value to an integer, truncating any decimal places.
 */
export function toInteger(value: unknown): number | null {
  const num = toNumber(value);
  if (Number.isNaN(num)) return null;
  return Math.trunc(num);
}
