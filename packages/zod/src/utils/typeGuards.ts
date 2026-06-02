/**
 * Type guard utility functions
 */

/**
 * Check if a value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if a value is a plain object (not an array, Date, etc.)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Check if a value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

/**
 * Check if a value is a primitive type
 */
export function isPrimitive(value: unknown): value is string | number | boolean | null | undefined | symbol | bigint {
  return value === null || (typeof value !== "object" && typeof value !== "function");
}

/**
 * Check if a value is a Promise-like (thenable)
 */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "then" in value &&
    typeof (value as Record<string, unknown>).then === "function"
  );
}

/**
 * Check if a value is an Error instance
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
