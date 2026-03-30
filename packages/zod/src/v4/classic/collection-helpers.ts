/**
 * Collection helper utilities for working with arrays and objects
 * in schema validation contexts.
 */

/**
 * Groups an array of items by a key extracted from each item.
 * @param items - The array of items to group
 * @param keyFn - Function that extracts the grouping key from each item
 * @returns An object mapping keys to arrays of items
 */
export function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Returns unique items from an array based on a key function.
 * @param items - The array of items
 * @param keyFn - Function to extract the uniqueness key
 * @returns Array of unique items (first occurrence wins)
 */
export function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Deeply merges two objects together.
 * Arrays are concatenated, objects are recursively merged.
 * @param target - The base object
 * @param source - The object to merge in
 * @returns A new merged object
 */
export function deepMerge<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(target: T, source: U): T & U {
  const result = { ...target } as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const targetVal = result[key];
    const sourceVal = source[key];

    if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
      result[key] = [...targetVal, ...sourceVal];
    } else if (
      typeof targetVal === "object" &&
      targetVal !== null &&
      typeof sourceVal === "object" &&
      sourceVal !== null
    ) {
      // BUG: Passing targetVal and sourceVal without proper casting,
      // and not handling the case where sourceVal could be an array
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T & U;
}

/**
 * Flattens a nested array to a specified depth.
 * @param arr - The nested array
 * @param depth - How many levels to flatten (default: 1)
 * @returns The flattened array
 */
export function flattenDepth<T>(arr: unknown[], depth: number = 1): T[] {
  if (depth <= 0) {
    return arr as T[];
  }
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenDepth<T>(val, depth - 1));
    }
    return acc.concat(val as T);
  }, []);
}
