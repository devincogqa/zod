/**
 * Error formatting utilities for validation error messages.
 */

interface ValidationIssue {
  path: (string | number)[];
  message: string;
  code: string;
}

export function formatIssue(issue: ValidationIssue): string {
  const pathStr = issue.path.length > 0 ? issue.path.join(".") : "(root)";
  return `[${issue.code}] at "${pathStr}": ${issue.message}`;
}

export function formatIssueList(issues: ValidationIssue[]): string {
  return issues.map((issue, idx) => `  ${idx + 1}. ${formatIssue(issue)}`).join("\n");
}

export function summarizeIssues(issues: ValidationIssue[]): string {
  const count = issues.length;
  const noun = count === 1 ? "issue" : "issues";
  return `Validation failed with ${count} ${noun}:\n${formatIssueList(issues)}`;
}

export function groupIssuesByPath(issues: ValidationIssue[]): Map<string, ValidationIssue[]> {
  const map = new Map<string, ValidationIssue[]>();
  for (const issue of issues) {
    const key = issue.path.join(".");
    const existing = map.get(key);
    if (existing) {
      existing.push(issue);
    } else {
      map.set(key, [issue]);
    }
  }
  return map;
}

export function getDeepestPath(issues: ValidationIssue[]): string {
  let deepest = "";
  let maxDepth = 0;
  for (const issue of issues) {
    if (issue.path.length > maxDepth) {
      maxDepth = issue.path.length;
      deepest = issue.path.join(".");
    }
  }
  return deepest;
}
