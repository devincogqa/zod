/**
 * Object utility helpers for Zod schema processing.
 */

/**
 * Shallow-merge two objects, with `overrides` taking precedence.
 */
export function merge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  base: A,
  overrides: B
): A & B {
  return { ...base, ...overrides };
}

/**
 * Pick specified keys from an object.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specified keys from an object.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deep-clone a plain object using JSON serialization.
 * NOTE: This does not handle Date, RegExp, functions, undefined, etc.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
