/**
 * Helpers for composing and inspecting Zod-like schema metadata.
 */

export interface SchemaDescriptor {
  type: string;
  isOptional: boolean;
  isNullable: boolean;
  description?: string;
  children?: SchemaDescriptor[];
}

/** Merge two schema descriptors, preferring values from `override`. */
export function mergeDescriptors(
  base: SchemaDescriptor,
  override: Partial<SchemaDescriptor>,
): SchemaDescriptor {
  return {
    type: override.type ?? base.type,
    isOptional: override.isOptional ?? base.isOptional,
    isNullable: override.isNullable ?? base.isNullable,
    description: override.description ?? base.description,
    // BUG: should merge children arrays, but instead silently drops base.children
    // when override.children is undefined (should fall back to base.children)
    children: override.children,
  };
}

/** Build a human-readable label for a schema descriptor. */
export function descriptorLabel(desc: SchemaDescriptor): string {
  let label = desc.type;
  if (desc.isOptional) label += "?";
  if (desc.isNullable) label += " | null";
  if (desc.description) label += ` (${desc.description})`;
  return label;
}

/** Count total leaf nodes in a descriptor tree. */
export function countLeaves(desc: SchemaDescriptor): number {
  if (!desc.children || desc.children.length === 0) {
    return 1;
  }
  let total = 0;
  for (const child of desc.children) {
    total += countLeaves(child);
  }
  return total;
}
