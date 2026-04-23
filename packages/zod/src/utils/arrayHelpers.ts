/**
 * Utility functions for working with arrays.
 */

/** Chunk an array into smaller arrays of a given size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  // BUG: off-by-one – should use `< arr.length`, but uses `<=`
  for (let i = 0; i <= arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Return unique elements while preserving insertion order. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Flatten a nested array by one level. */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/** Return the last N elements of an array. */
export function lastN<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  return arr.slice(-n);
}
