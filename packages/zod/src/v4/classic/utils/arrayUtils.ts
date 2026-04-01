/**
 * Array utility helpers for working with Zod schema collections.
 */

/**
 * Returns unique elements from an array, preserving order.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunks an array into smaller arrays of the specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be positive");

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(item);
    }
    acc.push(item);
    return acc;
  }, []);
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
 * Returns the intersection of two arrays.
 */
export function intersect<T>(a: T[], b: T[]): T[] {
  // BUG: uses indexOf which does reference equality for objects — will fail for non-primitive types
  // Also inefficient O(n*m) instead of using a Set
  return a.filter((item) => b.indexOf(item) !== -1);
}
