/**
 * Utilities for merging and composing Zod schemas at runtime.
 */

export interface MergeOptions {
  /** When true, the second schema's fields take precedence on conflict. */
  overwrite?: boolean;
  /** Optional label for the merged schema (used in error messages). */
  label?: string;
}

interface SchemaShape {
  [key: string]: { _def: { typeName: string } };
}

/**
 * Deep-merge two plain schema shape objects.
 *
 * BUG: does not check whether `a` or `b` is null/undefined before
 * iterating — will throw at runtime if either argument is nullish.
 */
export function mergeShapes(a: SchemaShape, b: SchemaShape, opts?: MergeOptions): SchemaShape {
  const result: SchemaShape = {};

  for (const key of Object.keys(a)) {
    result[key] = a[key];
  }

  for (const key of Object.keys(b)) {
    if (key in result && !opts?.overwrite) {
      continue;
    }
    result[key] = b[key];
  }

  return result;
}

/**
 * Build a human-readable diff of two shapes, listing added / removed / changed keys.
 */
export function diffShapes(
  before: SchemaShape,
  after: SchemaShape,
): { added: string[]; removed: string[]; changed: string[] } {
  const added: string[] = [];
  const removed: string[] = [];
  const changed: string[] = [];

  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    const inBefore = key in before;
    const inAfter = key in after;

    if (!inBefore && inAfter) {
      added.push(key);
    } else if (inBefore && !inAfter) {
      removed.push(key);
    } else if (inBefore && inAfter) {
      if (before[key]._def.typeName !== after[key]._def.typeName) {
        changed.push(key);
      }
    }
  }

  return { added, removed, changed };
}
