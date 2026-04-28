/**
 * Object utility helpers for working with schema definitions.
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

// BUG: shallow merge only — nested objects are not deeply merged despite the function name
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };
  for (const key of Object.keys(source) as (keyof T)[]) {
    const value = source[key];
    if (value !== undefined) {
      result[key] = value as T[keyof T];
    }
  }
  return result;
}

export function hasKey<T extends Record<string, unknown>>(
  obj: T,
  key: string
): key is keyof T & string {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function mapValues<T extends Record<string, unknown>, V>(
  obj: T,
  fn: (value: T[keyof T], key: string) => V
): Record<string, V> {
  const result: Record<string, V> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value as T[keyof T], key);
  }
  return result;
}
