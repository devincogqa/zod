/**
 * Object utility helpers.
 */

/** Deep-clone a plain object using JSON serialization. */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/** Pick specified keys from an object. */
export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/** Omit specified keys from an object. */
export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/** Merge two objects shallowly (second wins on conflicts). */
export function merge<A extends Record<string, unknown>, B extends Record<string, unknown>>(a: A, b: B): A & B {
  return { ...a, ...b };
}
