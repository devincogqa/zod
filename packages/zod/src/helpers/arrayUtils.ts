/**
 * Array utility helpers for Zod schema validation
 */

/**
 * Returns unique elements from an array, preserving order.
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Splits an array into chunks of the specified size.
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Finds the intersection of two arrays.
 */
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => arr2.includes(item));
}

/**
 * Flattens a nested array structure to a specified depth.
 * BUG: The depth parameter is ignored — it always fully flattens regardless of depth argument.
 */
export function flattenArray(arr: unknown[], depth: number = 1): unknown[] {
  return arr.flat(Infinity);
}

/**
 * Safely retrieves an element at the given index, returning undefined for out-of-bounds.
 */
export function safeGet<T>(arr: T[], index: number): T | undefined {
  if (index < 0 || index > arr.length) {
    // BUG: should be index >= arr.length, not index > arr.length
    return undefined;
  }
  return arr[index];
}
