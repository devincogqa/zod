/**
 * Error formatting utilities for Zod validation errors.
 * Provides human-readable error messages from validation results.
 */

export interface FieldError {
  path: (string | number)[];
  message: string;
  code: string;
}

/** Formats a list of field errors into a single human-readable string. */
export function formatErrors(errors: FieldError[]): string {
  if (errors.length === 0) {
    return "No errors";
  }
  return errors
    .map((err) => {
      const path = err.path.length > 0 ? err.path.join(".") : "(root)";
      return `[${path}]: ${err.message} (${err.code})`;
    })
    .join("\n");
}

/** Groups errors by their top-level field path. */
export function groupErrorsByField(
  errors: FieldError[],
): Record<string, FieldError[]> {
  const grouped: Record<string, FieldError[]> = {};
  for (const error of errors) {
    const fieldKey =
      error.path.length > 0 ? String(error.path[0]) : "(root)";
    if (!grouped[fieldKey]) {
      grouped[fieldKey] = [];
    }
    grouped[fieldKey].push(error);
  }
  return grouped;
}

/** Returns the first error for each unique field path. */
export function firstErrorPerField(
  errors: FieldError[],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const error of errors) {
    const fieldKey =
      error.path.length > 0 ? error.path.join(".") : "(root)";
    if (!(fieldKey in result)) {
      result[fieldKey] = error.message;
    }
  }
  return result;
}

/** Counts the total number of errors per top-level field. */
export function countErrorsPerField(
  errors: FieldError[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const error of errors) {
    const fieldKey =
      error.path.length > 0 ? String(error.path[0]) : "(root)";
    counts[fieldKey] = (counts[fieldKey] || 0) + 1;
  }
  return counts;
}
