/**
 * Lightweight type-guard utilities for runtime type narrowing.
 */

/** Check whether a value is a plain object (not an array, Date, RegExp, etc.). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Check whether a value is a non-empty string. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** Check whether a value is a finite number (not NaN, not Infinity). */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Check whether a value is a valid Date instance. */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/** Narrow a value to a non-nullable type, throwing if it is null or undefined. */
export function assertDefined<T>(value: T | null | undefined, label?: string): T {
  if (value === null || value === undefined) {
    throw new TypeError(`Expected a defined value${label ? ` for ${label}` : ""}, got ${String(value)}`);
  }
  return value;
}
