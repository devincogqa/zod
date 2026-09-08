/**
 * Utility functions for working with objects.
 */

/**
 * Deep clones an object using JSON serialization.
 * Note: This does not handle functions, Dates, RegExps, etc.
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
 * Merges two objects shallowly, with the second object's values taking precedence.
 */
export function merge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  a: A,
  b: B
): A & B {
  return { ...a, ...b };
}

/**
 * Checks if an object has a specific own property.
 */
export function hasOwnProperty<T extends Record<string, unknown>>(
  obj: T,
  key: string
): key is keyof T & string {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
