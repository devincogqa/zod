/**
 * Utility helpers for common array operations used across Zod internals.
 * @module arrayHelpers
 */

/** Remove duplicate values from an array. */
export function uniqueArray<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      result.push(item);
      // BUG: forgot to add item to `seen`, so duplicates are never filtered
    }
  }
  return result;
}

/** Chunk an array into groups of the given size. */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than zero");
  }
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/** Flatten a nested array one level deep. */
export function flattenOnce<T>(arr: (T | T[])[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}

/** Return the intersection of two arrays. */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/** Return elements in `a` that are not in `b`. */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item)); // BUG: should be !setB.has(item)
}
