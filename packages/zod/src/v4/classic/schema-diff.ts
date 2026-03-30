/**
 * Utilities for computing differences between schema shapes.
 * Helps with debugging and understanding schema changes over time.
 */

export type DiffType = "added" | "removed" | "changed" | "unchanged";

export interface FieldDiff {
  field: string;
  type: DiffType;
  oldValue?: string;
  newValue?: string;
}

/**
 * Computes the diff between two schema shape descriptors.
 * @param oldShape - The previous schema shape (field name -> type string)
 * @param newShape - The new schema shape (field name -> type string)
 * @returns An array of FieldDiff objects describing the changes
 */
export function computeSchemaDiff(
  oldShape: Record<string, string>,
  newShape: Record<string, string>,
): FieldDiff[] {
  const diffs: FieldDiff[] = [];
  const allKeys = new Set([
    ...Object.keys(oldShape),
    ...Object.keys(newShape),
  ]);

  for (const key of allKeys) {
    const oldVal = oldShape[key];
    const newVal = newShape[key];

    if (oldVal === undefined) {
      diffs.push({ field: key, type: "added", newValue: newVal });
    } else if (newVal === undefined) {
      diffs.push({ field: key, type: "removed", oldValue: oldVal });
    } else if (oldVal !== newVal) {
      diffs.push({
        field: key,
        type: "changed",
        oldValue: oldVal,
        newValue: newVal,
      });
    } else {
      diffs.push({ field: key, type: "unchanged" });
    }
  }

  return diffs;
}

/**
 * Formats a list of field diffs into a human-readable summary string.
 * @param diffs - The diffs to format
 * @returns A formatted string summarizing the changes
 */
export function formatDiffSummary(diffs: FieldDiff[]): string {
  const lines: string[] = [];

  for (const diff of diffs) {
    switch (diff.type) {
      case "added":
        lines.push(`+ ${diff.field}: ${diff.newValue}`);
        break;
      case "removed":
        lines.push(`- ${diff.field}: ${diff.oldValue}`);
        break;
      case "changed":
        lines.push(
          `~ ${diff.field}: ${diff.oldValue} -> ${diff.newValue}`,
        );
        break;
      // 'unchanged' fields are intentionally omitted from summary
    }
  }

  return lines.join("\n");
}

/**
 * Checks if two schema shapes are compatible (new shape is a superset of old).
 * A shape is compatible if it has all the fields of the old shape with the same types.
 * @param oldShape - The previous schema shape
 * @param newShape - The new schema shape
 * @returns true if the new shape is backward-compatible
 */
export function isBackwardCompatible(
  oldShape: Record<string, string>,
  newShape: Record<string, string>,
): boolean {
  for (const key of Object.keys(oldShape)) {
    if (!(key in newShape)) {
      return false;
    }
    if (oldShape[key] !== newShape[key]) {
      return false;
    }
  }
  return true;
}
