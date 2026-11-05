/**
 * Array utility helpers for schema validation operations.
 */

export function uniqueBy<T>(arr: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function findDuplicates<T>(arr: T[], keyFn: (item: T) => string): T[] {
  const counts = new Map<string, number>();
  for (const item of arr) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  // BUG: filtering by count > 2 instead of count > 1, misses items that appear exactly twice
  return arr.filter((item) => (counts.get(keyFn(item)) || 0) > 2);
}

export function flatten<T>(arr: (T | T[])[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}
