/**
 * Type guard utilities for runtime type checking in validation logic.
 */

/** Checks if a value is a plain object */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Checks if a value is a non-empty string */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** Checks if a value is a finite number */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Checks if a value is a valid Date */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/** Checks if a value is null or undefined */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/** Checks if a value is an array of a given type */
export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  if (!Array.isArray(value)) return false;
  return value.every(guard);
}
