/**
 * Array utility helpers used across Zod internals.
 */

/**
 * Remove duplicate values from an array (preserves first occurrence order).
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunk an array into smaller arrays of the given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flatten a nested array one level deep.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/**
 * Return the last element of an array, or undefined if empty.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Group array elements by a key returned from the callback.
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
