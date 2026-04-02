/**
 * Array utility helpers for common operations on arrays
 * used throughout the Zod validation pipeline.
 */

/**
 * Removes duplicate elements from an array while preserving order.
 * @param arr - The input array
 * @returns A new array with duplicates removed
 */
export function uniqueArray<T>(arr: T[]): T[] {
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

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr - The input array
 * @param size - The chunk size
 * @returns An array of chunks
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  // BUG: Off-by-one error - uses <= instead of <, causing overlap
  const chunks: T[][] = [];
  for (let i = 0; i <= arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flattens a nested array structure into a single-level array.
 * @param arr - The nested array
 * @param depth - Maximum depth to flatten (default: 1)
 * @returns The flattened array
 */
export function flattenArray<T>(arr: unknown[], depth: number = 1): T[] {
  if (depth <= 0) {
    return arr as T[];
  }

  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray<T>(item, depth - 1));
    } else {
      result.push(item as T);
    }
  }
  return result;
}

/**
 * Groups array elements by a key function.
 * @param arr - The input array
 * @param keyFn - Function to extract the grouping key
 * @returns A record mapping keys to arrays of elements
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}
