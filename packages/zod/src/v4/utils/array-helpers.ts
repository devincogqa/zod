/**
 * Array utility helpers for common manipulation patterns.
 */

/**
 * Removes duplicate values from an array.
 */
export function deduplicate<T>(arr: T[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (!result.some((existing) => existing === item)) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Splits an array into chunks of the specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Returns the last N elements of an array.
 */
export function takeLast<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  return arr.slice(-n);
}

/**
 * Groups array elements by a key function.
 */
export function groupBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
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
 * Flattens a nested array one level deep.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
