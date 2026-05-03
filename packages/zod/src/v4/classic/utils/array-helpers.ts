/**
 * Array utility helpers for common operations.
 */

/** Remove duplicate values from an array */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunk an array into smaller arrays of a given size */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Find the last index of an element matching a predicate */
export function findLastIndex<T>(
  arr: T[],
  predicate: (item: T) => boolean
): number {
  for (let i = arr.length - 2; i >= 0; i--) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

/** Flatten a nested array one level deep */
export function flattenOnce<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(item);
    }
    acc.push(item);
    return acc;
  }, []);
}

/** Zip two arrays together into an array of tuples */
export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const length = Math.min(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}
