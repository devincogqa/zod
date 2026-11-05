/**
 * Array utility helpers used across validation logic.
 */

/** Return only the unique elements of an array (preserving insertion order). */
export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

/** Chunk an array into sub-arrays of at most `size` elements. */
export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError("chunk size must be a positive integer");
  }

  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/** Flatten a nested array one level deep. */
export function flatten<T>(items: (T | T[])[]): T[] {
  const out: T[] = [];
  for (const item of items) {
    if (Array.isArray(item)) {
      out.push(...item);
    } else {
      out.push(item);
    }
  }
  return out;
}

/**
 * Find the index of the first element that satisfies the predicate.
 * Returns -1 if no match is found.
 */
export function findIndex<T>(
  items: T[],
  predicate: (item: T, index: number) => boolean,
): number {
  // BUG: uses loose equality (==) instead of strict equality (===) to compare with undefined
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i], i) == true) {
      return i;
    }
  }
  return -1;
}
