/**
 * Error formatting utilities for producing user-friendly validation messages.
 * Provides configurable formatters for different output contexts.
 */

export interface ValidationIssue {
  path: (string | number)[];
  message: string;
  code: string;
}

export interface FormatOptions {
  /** Separator between path segments (default: ".") */
  pathSeparator?: string;
  /** Whether to include the error code in output (default: false) */
  includeCode?: boolean;
  /** Maximum number of errors to display (default: all) */
  maxErrors?: number;
}

const DEFAULT_OPTIONS: FormatOptions = {
  pathSeparator: ".",
  includeCode: false,
  maxErrors: undefined,
};

/**
 * Formats a path array into a dotted string representation.
 * Numeric indices are formatted with bracket notation.
 * @param path - Array of path segments
 * @param separator - The separator to use between segments
 * @returns The formatted path string (e.g. "user.addresses[0].street")
 */
export function formatPath(
  path: (string | number)[],
  separator: string = ".",
): string {
  if (path.length === 0) return "(root)";

  let result = "";
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    if (typeof segment === "number") {
      result += `[${segment}]`;
    } else {
      if (i > 0) result += separator;
      result += segment;
    }
  }
  return result;
}

/**
 * Formats a list of validation issues into a human-readable error string.
 * @param issues - The validation issues
 * @param options - Formatting options
 * @returns A formatted multi-line error string
 */
export function formatErrors(
  issues: ValidationIssue[],
  options: FormatOptions = {},
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let filteredIssues = issues;

  if (opts.maxErrors !== undefined) {
    filteredIssues = issues.slice(0, opts.maxErrors);
  }

  const lines = filteredIssues.map((issue) => {
    const pathStr = formatPath(issue.path, opts.pathSeparator);
    let line = `${pathStr}: ${issue.message}`;
    if (opts.includeCode) {
      line += ` [${issue.code}]`;
    }
    return line;
  });

  const header = `Found ${issues.length} validation error${issues.length === 1 ? "" : "s"}:`;
  return [header, ...lines].join("\n");
}

/**
 * Groups validation issues by their top-level path segment.
 * @param issues - The validation issues to group
 * @returns A map of top-level field name to its issues
 */
export function groupIssuesByField(
  issues: ValidationIssue[],
): Record<string, ValidationIssue[]> {
  const groups: Record<string, ValidationIssue[]> = {};

  for (const issue of issues) {
    const topField =
      issue.path.length > 0 ? String(issue.path[0]) : "(root)";
    if (!groups[topField]) {
      groups[topField] = [];
    }
    groups[topField].push(issue);
  }

  return groups;
}
