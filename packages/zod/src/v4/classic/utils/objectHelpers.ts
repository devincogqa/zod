/**
 * Object utility helpers for working with plain objects
 * in the Zod validation and transformation pipeline.
 */

/**
 * Performs a shallow merge of two objects. Properties from `source`
 * overwrite properties in `target`.
 * @param target - The target object
 * @param source - The source object
 * @returns A new merged object
 */
export function shallowMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U
): T & U {
  return { ...target, ...source };
}

/**
 * Picks specified keys from an object, returning a new object
 * containing only those keys.
 * @param obj - The source object
 * @param keys - The keys to pick
 * @returns A new object with only the specified keys
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
 * Omits specified keys from an object, returning a new object
 * without those keys.
 * @param obj - The source object
 * @param keys - The keys to omit
 * @returns A new object without the specified keys
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
 * Deep clones a plain object using JSON serialization.
 * Note: This does not support functions, Dates, RegExps, Maps, Sets, etc.
 * @param obj - The object to clone
 * @returns A deep clone of the object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Checks whether two values are deeply equal using JSON comparison.
 * @param a - First value
 * @param b - Second value
 * @returns true if both values are deeply equal
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
