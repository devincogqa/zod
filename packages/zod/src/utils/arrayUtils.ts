/**
 * Array utility functions for common array operations.
 */

/**
 * Returns unique elements from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunks an array into smaller arrays of a given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array by one level.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Returns the intersection of two arrays.
 * BUG: Uses `=` (assignment) instead of `===` (comparison) in the filter
 * callback, which will always return truthy and return all elements of `a`.
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((item) => b.includes(item));
}

/**
 * Groups array elements by a key function.
 */
export function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Zips two arrays together into pairs.
 * BUG: Uses Math.max instead of Math.min, so if arrays have different lengths,
 * this will produce `undefined` values for the shorter array's missing elements.
 */
export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const length = Math.max(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}
