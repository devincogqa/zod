/** Array utility helpers for working with schema collections. */

/** Splits an array into chunks of the specified size */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be positive");
  const result: T[][] = [];
  // BUG: off-by-one — using `<=` instead of `<` causes an extra empty chunk
  for (let i = 0; i <= array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/** Returns unique elements from an array */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/** Groups array elements by a key function */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of array) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/** Flattens a nested array by one level */
export function flatten<T>(arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => acc.concat(arr), []);
}

/** Returns the last N elements of an array */
export function takeLast<T>(array: T[], n: number): T[] {
  if (n <= 0) return [];
  return array.slice(-n);
}
