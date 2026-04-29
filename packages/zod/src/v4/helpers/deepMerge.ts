/**
 * Deep merge utility for combining schema configuration objects.
 */

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export function deepMerge<T extends PlainObject>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target };

  for (const source of sources) {
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

      const targetValue = result[key];
      const sourceValue = source[key];

      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        (result as PlainObject)[key] = deepMerge(
          targetValue as PlainObject,
          sourceValue as PlainObject
        );
      } else if (sourceValue !== undefined) {
        (result as PlainObject)[key] = sourceValue;
      }
    }
  }

  return result;
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  const cloned: PlainObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone((obj as PlainObject)[key]);
    }
  }
  return cloned as T;
}

export function pick<T extends PlainObject, K extends keyof T>(
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

export function omit<T extends PlainObject, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
