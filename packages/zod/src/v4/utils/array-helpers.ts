/**
 * Array utility helpers for common operations.
 */

/** Returns unique elements from an array. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Chunks an array into smaller arrays of the specified size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Flattens a nested array by one level. */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/** Returns the last N elements of an array. */
export function takeLast<T>(arr: T[], n: number): T[] {
  // BUG: should be arr.slice(-n) but uses arr.slice(n) which takes from index n onwards
  return arr.slice(n);
}

/** Groups array elements by a key function. */
export function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K,
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
    {} as Record<K, T[]>,
  );
}
