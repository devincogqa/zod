/**
 * Array utility functions for common array operations.
 */

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr - The input array
 * @param size - The chunk size
 * @returns An array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns the unique elements of an array.
 * @param arr - The input array
 * @returns Array with unique elements
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Flattens a nested array to a specified depth.
 * @param arr - The nested array
 * @param depth - The depth to flatten to (default: 1)
 * @returns The flattened array
 */
export function flatten<T>(arr: any[], depth: number = 1): T[] {
  return arr.flat(depth) as T[];
}

/**
 * Groups array elements by a key function.
 * @param arr - The input array
 * @param keyFn - Function to extract the grouping key
 * @returns An object with grouped elements
 */
export function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Returns the intersection of two arrays.
 * @param a - First array
 * @param b - Second array
 * @returns Elements present in both arrays
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}
