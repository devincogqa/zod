/**
 * Type guard utilities for runtime type checking in Zod internals.
 */

/** Check if a value is a non-null object. */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Check if a value is a plain object (not a class instance). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Check if a value is a non-empty string. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** Check if a value is a finite number (not NaN or Infinity). */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Check if a value is a valid Date object. */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/** Check if a value is a Promise-like (thenable). */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).then === "function"
  );
}
