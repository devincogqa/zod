/**
 * Type guard utilities for runtime type checking in Zod schemas.
 */

/**
 * Checks if a value is a plain object (not an array, null, Date, etc.).
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Checks if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Checks if a value is a finite number (not NaN, not Infinity).
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Checks if a value is an integer.
 */
export function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

/**
 * Checks if a value is a valid Date object.
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * Checks if a value is a Promise-like (thenable).
 */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "then" in (value as Record<string, unknown>) &&
    typeof (value as Record<string, unknown>).then === "function"
  );
}

/**
 * Checks if a value is nullish (null or undefined).
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
