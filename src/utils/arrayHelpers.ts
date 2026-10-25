/**
 * Utility functions for common array operations.
 */

/** Remove duplicate values from an array. */
export function uniqueArray<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      result.push(item);
    }
  }
  return result;
}

/** Chunk an array into groups of `size`. */
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

/** Flatten a nested array one level deep. */
export function flattenOnce<T>(arr: T[][]): T[] {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/** Return the intersection of two arrays. */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}
