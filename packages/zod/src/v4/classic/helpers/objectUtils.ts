/** Object utility helpers for working with schema metadata and config objects. */

/** Return a shallow copy of the object with the specified keys omitted. */
export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/** Return a shallow copy of the object containing only the specified keys. */
export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/** Deep-freeze an object and all nested objects, making it fully immutable. */
export function deepFreeze<T extends Record<string, unknown>>(obj: T): Readonly<T> {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value as Record<string, unknown>);
    }
  }
  return obj;
}

/** Merge two objects shallowly, with `overrides` taking precedence. */
export function merge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  base: A,
  overrides: B
): A & B {
  return { ...base, ...overrides };
}

/** Return the number of own enumerable keys in an object. */
export function keyCount(obj: Record<string, unknown>): number {
  return Object.keys(obj).length;
}
