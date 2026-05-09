/**
 * Array utility functions for working with schema collections and results.
 */

/** Removes duplicate values from an array. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Groups an array of items by a key function. */
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

/** Finds the first item matching the predicate, returns undefined if not found. */
export function findFirst<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }
  }
  return undefined;
}

/** Chunks an array into smaller arrays of the specified size. */
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

/** Flattens a nested array one level deep. */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/** Compares two arrays for equality using loose comparison. */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}
