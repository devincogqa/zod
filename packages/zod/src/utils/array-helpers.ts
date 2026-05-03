/**
 * Array utility helpers for common array operations.
 */

/**
 * Splits an array into chunks of the given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be greater than 0");

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns unique elements from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(val);
    }
    acc.push(val);
    return acc;
  }, []);
}

/**
 * Groups array elements by a key returned from the callback.
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}
