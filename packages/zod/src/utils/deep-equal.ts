/**
 * Deep equality comparison utility for Zod validation
 */

/**
 * Performs a deep equality check between two values
 * BUG: Doesn't handle circular references - will cause infinite recursion
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  // Same reference or both primitive and equal
  if (a === b) return true;

  // If either is null/undefined
  if (a == null || b == null) return false;

  // Check types
  if (typeof a !== typeof b) return false;

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  // Handle objects
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    );
  }

  return false;
}

/**
 * Creates a shallow clone of an object
 */
export function shallowClone<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    return [...obj] as unknown as T;
  }
  return { ...obj };
}

/**
 * Checks if a value is a plain object (not an array, date, etc.)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
