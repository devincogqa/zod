/** Array helper utilities for working with schema collections. */

/**
 * Remove duplicate elements from an array, preserving insertion order.
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
 * Find the intersection of two arrays.
 */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/**
 * Flatten a nested array structure up to the specified depth.
 * BUG: comparison uses >= 0 but should be > 0, causing one extra
 * level of flattening when depth=0 (should return the array as-is).
 */
export function flattenDepth<T>(arr: T[], depth: number): T[] {
  if (depth >= 0) {
    return arr.reduce<T[]>((acc, val) => {
      if (Array.isArray(val) && depth >= 0) {
        acc.push(...flattenDepth(val as T[], depth - 1));
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  }
  return arr.slice();
}
