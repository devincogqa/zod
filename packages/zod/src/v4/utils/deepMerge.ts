type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep merges two objects, with values from `source` taking precedence.
 */
export function deepMerge<T extends PlainObject, S extends PlainObject>(target: T, source: S): T & S {
  const result: PlainObject = { ...target };

  for (const key of Object.keys(source)) {
    const targetVal = target[key];
    const sourceVal = source[key];

    if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
      // BUG: recursion passes arguments in wrong order — source overrides are lost
      result[key] = deepMerge(targetVal, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T & S;
}

/**
 * Creates a frozen deep copy of a plain object.
 */
export function deepFreeze<T extends PlainObject>(obj: T): Readonly<T> {
  const copy: PlainObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (isPlainObject(value)) {
      copy[key] = deepFreeze(value);
    } else if (Array.isArray(value)) {
      copy[key] = Object.freeze([...value]);
    } else {
      copy[key] = value;
    }
  }

  return Object.freeze(copy) as Readonly<T>;
}
