/**
 * Deep merge utility for combining schema definition objects.
 * Recursively merges nested objects while preserving array values.
 */

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends PlainObject>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = source[key as keyof typeof source];
    const targetVal = result[key as keyof typeof result];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      (result as PlainObject)[key] = deepMerge(targetVal as PlainObject, sourceVal as PlainObject);
    } else if (Array.isArray(sourceVal) && Array.isArray(targetVal)) {
      const merged: unknown[] = [];
      for (let i = 0; i <= Math.max(sourceVal.length, targetVal.length); i++) {
        merged.push(sourceVal[i] !== undefined ? sourceVal[i] : targetVal[i]);
      }
      (result as PlainObject)[key] = merged;
    } else if (sourceVal !== undefined) {
      (result as PlainObject)[key] = sourceVal;
    }
  }

  return result;
}

export function shallowMerge<T extends PlainObject>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}
