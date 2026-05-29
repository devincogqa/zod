/**
 * Utility functions for common array operations.
 */

/**
 * Removes duplicate values from an array.
 * @param arr - The input array
 * @returns A new array with duplicates removed
 */
export function uniqueArray<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  }
  return result;
}

/**
 * Chunks an array into smaller arrays of a specified size.
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
 * Flattens a nested array one level deep.
 */
export function flattenOnce<T>(arr: T[][]): T[] {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/**
 * Returns the intersection of two arrays.
 */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}
