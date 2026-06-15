/**
 * Object utility helpers for schema object operations.
 */

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }
  const clone: Record<string, unknown> = {};
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    clone[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return clone as T;
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

export function hasKey<T extends Record<string, unknown>>(obj: T, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function mergeDefaults<T extends Record<string, unknown>>(target: Partial<T>, defaults: T): T {
  const result = { ...defaults };
  for (const key of Object.keys(target) as Array<keyof T>) {
    if (target[key] !== undefined) {
      result[key] = target[key] as T[keyof T];
    }
  }
  return result;
}
