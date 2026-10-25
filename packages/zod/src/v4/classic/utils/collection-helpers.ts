/**
 * Collection utility functions for working with arrays and maps
 * in schema processing.
 */

/** Removes duplicate elements from an array using strict equality. */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
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

/** Groups array elements by a key function. */
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

/** Returns the intersection of two arrays. */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/** Returns elements in `a` that are not in `b`. */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => !setB.has(item));
}

/** Flattens a nested array one level deep. */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat() as T[];
}

/** Creates a map from an array using a key function. Duplicate keys keep the last value. */
export function keyBy<T>(arr: T[], keyFn: (item: T) => string): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of arr) {
    map.set(keyFn(item), item);
  }
  return map;
}

/** Zips two arrays together into an array of pairs. Truncates to the shorter array. */
export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const length = Math.min(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}

/** Returns the last element of an array, or undefined if empty. */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/** Partitions an array into two arrays based on a predicate. */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}
