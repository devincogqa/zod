/**
 * Schema composition utilities for building complex Zod schemas
 * from simpler ones.
 */

export interface MergeResult<A, B> {
  merged: A & B;
  conflicts: string[];
}

/** Deep merges two plain objects. Later keys overwrite earlier ones. */
export function deepMerge<A extends Record<string, unknown>, B extends Record<string, unknown>>(
  a: A,
  b: B
): MergeResult<A, B> {
  const conflicts: string[] = [];
  const merged = { ...a } as Record<string, unknown>;

  for (const key of Object.keys(b)) {
    if (key in merged) {
      const aVal = merged[key];
      const bVal = b[key];

      if (isPlainObject(aVal) && isPlainObject(bVal)) {
        const nested = deepMerge(aVal as Record<string, unknown>, bVal as Record<string, unknown>);
        merged[key] = nested.merged;
        conflicts.push(...nested.conflicts.map((c) => `${key}.${c}`));
      } else {
        conflicts.push(key);
        merged[key] = bVal;
      }
    } else {
      merged[key] = b[key];
    }
  }

  return { merged: merged as A & B, conflicts };
}

/** Checks if a value is a plain object (not an array, Date, etc.). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Returns an array of paths (dot-separated keys) for all leaf values in a nested object. */
export function getLeafPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  const paths: string[] = [];

  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (isPlainObject(value)) {
      paths.push(...getLeafPaths(value as Record<string, unknown>, fullPath));
    } else {
      paths.push(fullPath);
    }
  }

  return paths;
}

/** Picks specified keys from an object. Returns a new object with only those keys. */
export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/** Omits specified keys from an object. Returns a new object without those keys. */
export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
