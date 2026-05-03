/**
 * Error formatting utilities for Zod validation errors.
 */

export interface ZodFieldError {
  path: (string | number)[];
  message: string;
  code: string;
}

/**
 * Format a Zod-style path array into a human-readable dot-notation string.
 * E.g. ["user", "address", 0, "street"] => "user.address.0.street"
 */
export function formatZodPath(path: (string | number)[]): string {
  return path.join(".");
}

/**
 * Group a flat list of field errors by their top-level key.
 */
export function groupErrorsByField(errors: ZodFieldError[]): Record<string, ZodFieldError[]> {
  const grouped: Record<string, ZodFieldError[]> = {};
  for (const error of errors) {
    const key = String(error.path[0] ?? "_root");
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(error);
  }
  return grouped;
}

/**
 * Summarize a list of errors into a single user-facing message.
 * Shows first N errors and appends "and X more" if truncated.
 */
export function summarizeErrors(errors: ZodFieldError[], maxShown = 3): string {
  if (errors.length === 0) return "No errors";

  const shown = errors.slice(0, maxShown);
  const lines = shown.map((e) => `${formatZodPath(e.path)}: ${e.message}`);

  const remaining = errors.length - shown.length;
  if (remaining > 0) {
    lines.push(`and ${remaining} more error(s)`);
  }

  return lines.join("; ");
}

/**
 * Build a nested object representing the error tree.
 * Each leaf contains the error message string.
 */
export function buildErrorTree(errors: ZodFieldError[]): Record<string, unknown> {
  const tree: Record<string, unknown> = {};
  for (const error of errors) {
    let current: Record<string, unknown> = tree;
    for (let i = 0; i < error.path.length; i++) {
      const segment = String(error.path[i]);
      if (i === error.path.length - 1) {
        current[segment] = error.message;
      } else {
        if (!current[segment] || typeof current[segment] !== "object") {
          current[segment] = {};
        }
        current = current[segment] as Record<string, unknown>;
      }
    }
  }
  return tree;
}
