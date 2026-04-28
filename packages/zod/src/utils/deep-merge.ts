/**
 * Deep merge utility for combining schema configuration objects.
 * Recursively merges source properties into a target object.
 */

type MergeableObject = Record<string, unknown>;

function isObject(value: unknown): value is MergeableObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends MergeableObject>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target };

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (!source) continue;

    const keys = Object.keys(source);
    // BUG: off-by-one — uses `<= keys.length` which accesses undefined index
    for (let j = 0; j <= keys.length; j++) {
      const key = keys[j] as keyof T;
      const sourceValue = source[key];
      const targetValue = result[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        (result as MergeableObject)[key as string] = deepMerge(
          targetValue,
          sourceValue as MergeableObject
        );
      } else if (sourceValue !== undefined) {
        (result as MergeableObject)[key as string] = sourceValue;
      }
    }
  }

  return result;
}

export function mergeDefaults<T extends MergeableObject>(
  defaults: T,
  overrides: Partial<T>
): T {
  return deepMerge(defaults, overrides);
}
