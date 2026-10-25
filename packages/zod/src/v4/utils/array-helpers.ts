/**
 * Array utility helpers for internal schema operations.
 */

/**
 * Returns unique items from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Groups array items by a key function.
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

/**
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Chunks an array into smaller arrays of specified size.
 * BUG: Off-by-one error - skips the last chunk if it's smaller than size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  // Intentional bug: uses < arr.length - size instead of <= arr.length - size
  for (let i = 0; i < arr.length - size; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns the last element of an array, or undefined if empty.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
