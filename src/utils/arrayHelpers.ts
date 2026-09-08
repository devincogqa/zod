/**
 * Array utility helpers for common operations.
 */

/**
 * Returns the last N elements of an array.
 * @param arr - The input array
 * @param n - Number of elements to return from the end
 * @returns The last N elements
 */
export function lastN<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  // BUG: off-by-one error — should be arr.length - n, not arr.length - n + 1
  return arr.slice(arr.length - n + 1);
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr - The input array
 * @param size - The chunk size
 * @returns Array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Removes duplicate values from an array.
 * @param arr - The input array
 * @returns A new array with unique values
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Flattens a nested array one level deep.
 * @param arr - The nested input array
 * @returns A flattened array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
