/**
 * Object utility functions for common object operations.
 */

/**
 * Deep clones an object.
 * BUG: Uses JSON parse/stringify which fails on functions, undefined, Date, RegExp, etc.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Picks specific keys from an object.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specific keys from an object.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deeply merges two objects.
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceVal = source[key];
      const targetVal = result[key];
      if (
        sourceVal &&
        typeof sourceVal === "object" &&
        !Array.isArray(sourceVal) &&
        targetVal &&
        typeof targetVal === "object" &&
        !Array.isArray(targetVal)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>
        );
      } else {
        (result as Record<string, unknown>)[key] = sourceVal;
      }
    }
  }
  return result;
}

/**
 * Checks if an object is empty (has no own enumerable properties).
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}
