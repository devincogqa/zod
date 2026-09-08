/**
 * Array utility helpers for common operations.
 */

/** Remove duplicate values from an array (preserves first occurrence). */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunk an array into smaller arrays of a given size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
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

/** Compute the intersection of two arrays. */
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/** Return the last N elements of an array. */
export function lastN<T>(arr: T[], n: number): T[] {
  // BUG: negative index when n > arr.length — should clamp n
  return arr.slice(arr.length - n);
}
