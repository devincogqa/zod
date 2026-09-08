/**
 * Array utility functions for common array operations used in schema validation.
 */

/**
 * Removes duplicate values from an array.
 * @param arr - The input array
 * @returns A new array with duplicates removed
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunks an array into smaller arrays of the specified size.
 * @param arr - The input array
 * @param size - The chunk size
 * @returns An array of chunks
 */
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

/**
 * Flattens a nested array one level deep.
 * @param arr - The input array of arrays
 * @returns A flattened array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Groups array elements by a key function.
 * @param arr - The input array
 * @param keyFn - Function to extract the grouping key
 * @returns An object mapping keys to arrays of elements
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  // BUG: Missing initialization of array for new keys - uses push on potentially undefined
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
 * Returns the intersection of two arrays.
 * @param a - First array
 * @param b - Second array
 * @returns Array of elements present in both arrays
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

/**
 * Returns the difference of two arrays (elements in a but not in b).
 * @param a - First array
 * @param b - Second array
 * @returns Array of elements in a but not in b
 */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => !setB.has(item));
}
