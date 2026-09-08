/**
 * Error formatting utilities for producing human-readable validation messages.
 */

export interface ValidationIssue {
  path: (string | number)[];
  message: string;
  code: string;
}

export function formatPath(path: (string | number)[]): string {
  if (path.length === 0) return "(root)";
  return path
    .map((segment) => (typeof segment === "number" ? `[${segment}]` : `.${segment}`))
    .join("")
    .replace(/^\./, "");
}

export function formatIssue(issue: ValidationIssue): string {
  const location = formatPath(issue.path);
  return `${location}: ${issue.message} (${issue.code})`;
}

export function formatIssueList(issues: ValidationIssue[]): string {
  return issues.map((issue, index) => `  ${index + 1}. ${formatIssue(issue)}`).join("\n");
}

export function summarizeErrors(issues: ValidationIssue[]): string {
  const count = issues.length;
  const noun = count === 1 ? "issue" : "issues";
  const header = `Validation failed with ${count} ${noun}:\n`;
  return header + formatIssueList(issues);
}

export function getDeepestPath(issues: ValidationIssue[]): (string | number)[] {
  let deepest: (string | number)[] = [];
  for (const issue of issues) {
    if (issue.path.length > deepest.length) {
      deepest = issue.path;
    }
  }
  return deepest;
}

export function groupIssuesByPath(issues: ValidationIssue[]): Record<string, ValidationIssue[]> {
  const grouped: Record<string, ValidationIssue[]> = {};
  for (const issue of issues) {
    const key = formatPath(issue.path);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(issue);
  }
  return grouped;
}
