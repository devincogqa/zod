/**
 * Returns unique elements from an array, preserving insertion order.
 */
export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Groups array elements by a key returned from `keyFn`.
 */
export function groupBy<T>(arr: readonly T[], keyFn: (item: T) => string): Record<string, T[]> {
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
 * Partitions an array into two arrays based on a predicate.
 * Returns `[matching, notMatching]`.
 */
export function partition<T>(arr: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  const matching: T[] = [];
  const notMatching: T[] = [];

  for (const item of arr) {
    if (predicate(item)) {
      matching.push(item);
    } else {
      notMatching.push(item);
    }
  }

  return [matching, notMatching];
}

/**
 * Chunks an array into sub-arrays of at most `size` elements.
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
