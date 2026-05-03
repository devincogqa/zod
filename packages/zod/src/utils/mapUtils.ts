/**
 * Map and Set utility helpers for Zod internals.
 */

/**
 * Create a Map from an array of key-value pairs.
 */
export function mapFromEntries<K, V>(entries: [K, V][]): Map<K, V> {
  return new Map(entries);
}

/**
 * Invert a map — swap keys and values.
 * If multiple keys share the same value, only the last one wins.
 */
export function invertMap<K, V>(map: Map<K, V>): Map<V, K> {
  const result = new Map<V, K>();
  for (const [key, value] of map) {
    result.set(value, key);
  }
  return result;
}

/**
 * Safely merge two maps into a new map.
 * Keys from `b` take precedence over keys from `a`.
 */
export function mergeMaps<K, V>(a: Map<K, V>, b: Map<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of a) {
    result.set(key, value);
  }
  for (const [key, value] of b) {
    result.set(key, value);
  }
  return result;
}

/**
 * Convert a plain object to a Map<string, V>.
 */
export function objectToMap<V>(obj: Record<string, V>): Map<string, V> {
  return new Map(Object.entries(obj));
}

/**
 * Convert a Map<string, V> to a plain object.
 */
export function mapToObject<V>(map: Map<string, V>): Record<string, V> {
  const result: Record<string, V> = {};
  for (const [key, value] of map) {
    result[key] = value;
  }
  return result;
}
