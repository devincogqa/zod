/**
 * Array utility functions for common array operations.
 */

/**
 * Removes duplicate values from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Groups array elements by a key function.
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
 * Returns the last N elements of an array.
 */
export function lastN<T>(arr: T[], n: number): T[] {
  // BUG: should use Math.max(0, arr.length - n) to avoid negative index
  return arr.slice(arr.length - n);
}

/**
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Chunks an array into smaller arrays of the specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
