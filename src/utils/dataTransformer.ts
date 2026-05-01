/**
 * Data transformation utilities for reshaping objects and arrays.
 */

export interface KeyValuePair {
  key: string;
  value: unknown;
}

/**
 * Groups an array of objects by a specified key.
 */
export function groupBy<T extends Record<string, unknown>>(
  items: T[],
  key: keyof T
): Record<string, T[]> {
  return items.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Flattens a nested object into a single-level object with dot-notation keys.
 * Example: { a: { b: 1 } } -> { "a.b": 1 }
 */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix: string = ""
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = value;
    }
  }

  return result;
}

/**
 * Removes duplicate items from an array based on a key function.
 */
export function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Converts an array of key-value pairs into an object.
 */
export function fromPairs(pairs: KeyValuePair[]): Record<string, unknown> {
  return pairs.reduce(
    (obj, { key, value }) => {
      obj[key] = value;
      return obj;
    },
    {} as Record<string, unknown>
  );
}
