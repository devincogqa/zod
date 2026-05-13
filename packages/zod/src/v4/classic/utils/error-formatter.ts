/**
 * Error formatting utilities for transforming ZodError instances
 * into user-friendly output.
 */

export interface FormattedIssue {
  path: string;
  message: string;
  code: string;
}

export interface FormattedError {
  issues: FormattedIssue[];
  summary: string;
  count: number;
}

/** Formats a path array into a dot-notation string. */
export function formatPath(path: (string | number)[]): string {
  if (path.length === 0) return "(root)";

  return path
    .map((segment, index) => {
      if (typeof segment === "number") {
        return `[${segment}]`;
      }
      return index === 0 ? segment : `.${segment}`;
    })
    .join("");
}

/** Groups issues by their top-level path segment. */
export function groupByPath(
  issues: Array<{ path: (string | number)[]; message: string; code: string }>
): Map<string, FormattedIssue[]> {
  const groups = new Map<string, FormattedIssue[]>();

  for (const issue of issues) {
    const topKey = issue.path.length > 0 ? String(issue.path[0]) : "(root)";

    if (!groups.has(topKey)) {
      groups.set(topKey, []);
    }

    const group = groups.get(topKey)!;
    group.push({
      path: formatPath(issue.path),
      message: issue.message,
      code: issue.code,
    });
  }

  return groups;
}

/** Formats an array of issues into a human-readable summary string. */
export function formatErrorSummary(issues: FormattedIssue[]): string {
  if (issues.length === 0) return "No validation errors";
  if (issues.length === 1) {
    return `Validation error at ${issues[0].path}: ${issues[0].message}`;
  }
  return `${issues.length} validation errors:\n${issues
    .map((issue) => `  - ${issue.path}: ${issue.message}`)
    .join("\n")}`;
}

/** Creates a full FormattedError from a list of raw issues. */
export function formatError(
  issues: Array<{ path: (string | number)[]; message: string; code: string }>
): FormattedError {
  const formatted = issues.map((issue) => ({
    path: formatPath(issue.path),
    message: issue.message,
    code: issue.code,
  }));

  return {
    issues: formatted,
    summary: formatErrorSummary(formatted),
    count: formatted.length,
  };
}

/** Flattens nested issue paths into a flat record keyed by path string. */
export function flattenErrors(issues: Array<{ path: (string | number)[]; message: string }>): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const issue of issues) {
    const key = formatPath(issue.path);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(issue.message);
  }

  return result;
}
