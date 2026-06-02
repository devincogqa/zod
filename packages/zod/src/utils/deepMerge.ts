/**
 * Deep merge utilities for combining schema configuration objects.
 */

type PlainObject = Record<string, unknown>;

/**
 * Check if a value is a plain object (not an array, Date, RegExp, etc).
 */
function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Deep merge two objects. Properties in `source` override those in `target`.
 * Arrays are replaced, not concatenated. Nested objects are recursively merged.
 */
export function deepMerge<T extends PlainObject>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = (source as PlainObject)[key];
    const targetVal = (result as PlainObject)[key];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      (result as PlainObject)[key] = deepMerge(targetVal, sourceVal);
    } else {
      (result as PlainObject)[key] = sourceVal;
    }
  }

  return result;
}

/**
 * Deep merge multiple objects from left to right.
 */
export function deepMergeAll<T extends PlainObject>(...objects: Partial<T>[]): T {
  if (objects.length === 0) return {} as T;
  return objects.reduce((acc, obj) => deepMerge(acc as T, obj), objects[0]) as T;
}

/**
 * Deep clone a plain object by serializing and deserializing.
 * Note: This will not preserve functions, Dates, RegExps, etc.
 */
export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Get a nested value from an object using a dot-separated path.
 * Returns undefined if any part of the path doesn't exist.
 */
export function getNestedValue(obj: PlainObject, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as PlainObject)[key];
  }

  return current;
}

/**
 * Set a nested value on an object using a dot-separated path.
 * Creates intermediate objects as needed.
 */
export function setNestedValue(obj: PlainObject, path: string, value: unknown): void {
  const keys = path.split(".");
  let current: PlainObject = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key] as PlainObject;
  }

  current[keys[keys.length - 1]] = value;
}
