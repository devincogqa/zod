/**
 * Type coercion utilities for safely converting between common types.
 * Provides consistent coercion behavior for Zod schema parsing.
 */

/** Safely coerces a value to a number. Returns NaN for non-coercible values. */
export function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return NaN;
    }
    return Number(trimmed);
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return NaN;
}

/** Safely coerces a value to a boolean. */
export function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim();
    if (lower === "true" || lower === "1" || lower === "yes") {
      return true;
    }
    return false;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  return false;
}

/** Safely coerces a value to a Date object. */
export function toDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "number") {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  if (value == null) {
    return null;
  }
  const str = String(value).trim();
  if (str === "") {
    return null;
  }
  const date = new Date(str);
  return isNaN(date.getTime()) ? null : date;
}

/** Safely coerces a value to a string representation. */
export function toString(value: unknown): string {
  if (value === null) {
    return "";
  }
  if (value === undefined) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return String(value);
}
