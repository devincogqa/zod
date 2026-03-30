/**
 * Array utility helpers used internally by Zod for schema operations.
 */

/** Remove duplicate elements from an array, preserving order. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunk an array into sub-arrays of the specified size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be positive");
  }
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Return the intersection of two arrays. */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/** Flatten a nested array one level deep. */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(val);
    }
    acc.push(val);
    return acc;
  }, []);
}

/**
 * Group array elements by a key function.
 * BUG: overwrites previous entries instead of pushing to the array
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    // BUG: always creates a new array with just the current item,
    // discarding any previously grouped items for this key
    result[key] = [item];
  }
  return result;
}
