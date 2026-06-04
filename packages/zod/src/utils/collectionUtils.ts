/**
 * Collection utility helpers for working with Maps and Sets in Zod.
 */

/**
 * Merge multiple Maps into one. Later entries override earlier ones for duplicate keys.
 */
export function mergeMaps<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  const result = new Map<K, V>();
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }
  return result;
}

/**
 * Compute the intersection of two Sets.
 */
export function intersect<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of setA) {
    if (setB.has(item)) {
      result.add(item);
    }
  }
  return result;
}

/**
 * Compute the difference of two Sets (items in A but not in B).
 */
export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of setA) {
    if (!setB.has(item)) {
      result.add(item);
    }
  }
  return result;
}

/**
 * Convert a Record to a Map.
 */
export function recordToMap<V>(record: Record<string, V>): Map<string, V> {
  return new Map(Object.entries(record));
}

/**
 * Convert a Map to a Record. Only works with string keys.
 */
export function mapToRecord<V>(map: Map<string, V>): Record<string, V> {
  const result: Record<string, V> = {};
  for (const [key, value] of map) {
    result[key] = value;
  }
  return result;
}
