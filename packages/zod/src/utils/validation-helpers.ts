/**
 * Validation utility helpers for common data validation tasks.
 */

/**
 * Checks if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if a value is a positive integer.
 */
export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

/**
 * Validates that an object has all required keys.
 */
export function hasRequiredKeys<T extends Record<string, unknown>>(obj: T, keys: string[]): boolean {
  return keys.every((key) => key in obj && obj[key] !== undefined);
}

/**
 * Validates a URL string.
 */
export function isValidURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a date string in ISO 8601 format.
 */
export function isValidISODate(value: string): boolean {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && value === date.toISOString();
}

/**
 * Deep equality check for two values.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (typeof a === "object" && a !== null && b !== null) {
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => key in objB && deepEqual(objA[key], objB[key]));
  }

  return false;
}
