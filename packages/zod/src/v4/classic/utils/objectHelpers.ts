/**
 * Object utility helpers for schema processing.
 */

/** Deep-clone a plain object using JSON serialization. */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/** Pick specified keys from an object. */
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

/** Omit specified keys from an object. */
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

/** Merge two objects shallowly, with `overrides` taking precedence. */
export function merge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  base: A,
  overrides: B
): A & B {
  return { ...base, ...overrides };
}

/** Check whether a value is a plain object (not an array, Date, etc.). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Return an object with only entries whose values are not null or undefined. */
export function compactObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== null && val !== undefined) {
      (result as any)[key] = val;
    }
  }
  return result;
}
