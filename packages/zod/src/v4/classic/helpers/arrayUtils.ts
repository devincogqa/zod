/** Array utility helpers used across schema validation logic. */

/**
 * Return a new array with duplicate values removed.
 * Uses strict equality for comparison.
 */
export function unique<T>(arr: readonly T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

/** Chunk an array into groups of the specified size. */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  if (size <= 0) throw new RangeError("Chunk size must be positive");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flatten a nested array one level deep.
 * Returns a new flat array without modifying the input.
 */
export function flatten<T>(arr: readonly (T | readonly T[])[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item as T);
    }
  }
  return result;
}

/** Return the last element of an array, or undefined if empty. */
export function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

/** Return the first element of an array, or undefined if empty. */
export function first<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}
