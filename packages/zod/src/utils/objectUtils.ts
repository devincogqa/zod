/**
 * Object utility functions for common object operations.
 */

/**
 * Deep clones an object using JSON serialization.
 * Note: This does not handle functions, undefined, Dates, RegExps, etc.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Picks specified keys from an object.
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
 * Omits specified keys from an object.
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
 * Performs a shallow merge of multiple objects (left-to-right).
 */
export function merge<T extends Record<string, unknown>>(
  ...objects: Partial<T>[]
): T {
  return Object.assign({}, ...objects) as T;
}

/**
 * Checks if an object is empty (has no own enumerable properties).
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}
