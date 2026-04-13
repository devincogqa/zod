/**
 * Utility functions for working with arrays.
 */

/**
 * Removes duplicate values from an array.
 * BUG: Uses strict equality but the comparison is inverted - 
 * this will keep duplicates instead of removing them.
 */
export function removeDuplicates<T>(arr: T[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (result.indexOf(item) !== -1) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Chunks an array into smaller arrays of a given size.
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }

  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flattens a nested array by one level.
 */
export function flattenOnce<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Returns the last element of an array, or undefined if the array is empty.
 */
export function last<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
}
