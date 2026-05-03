/**
 * Type narrowing utilities for runtime type checks.
 */

/**
 * Check if a value is a non-null primitive (string, number, boolean, bigint, symbol).
 */
export function isPrimitive(value: unknown): value is string | number | boolean | bigint | symbol {
  if (value === null || value === undefined) return false;
  const t = typeof value;
  return t === "string" || t === "number" || t === "boolean" || t === "bigint" || t === "symbol";
}

/**
 * Check if a value is iterable (has Symbol.iterator).
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return value != null && typeof (value as Record<symbol, unknown>)[Symbol.iterator] === "function";
}

/**
 * Check if a value is a Promise-like (thenable).
 */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return value != null && typeof (value as Record<string, unknown>).then === "function";
}

/**
 * Narrow an unknown value to a string array.
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * Check whether a value is a record (object) with string keys.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
