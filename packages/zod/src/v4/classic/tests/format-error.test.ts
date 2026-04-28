import { describe, expect, test } from "vitest";

import {
  formatPath,
  formatIssue,
  formatIssueList,
  summarizeErrors,
  getDeepestPath,
  groupIssuesByPath,
} from "../format-error.js";
import type { ValidationIssue } from "../format-error.js";

describe("formatPath", () => {
  test("returns (root) for empty path", () => {
    expect(formatPath([])).toBe("(root)");
  });

  test("formats string segments with dot notation", () => {
    expect(formatPath(["user", "name"])).toBe("user.name");
  });

  test("formats number segments with bracket notation", () => {
    expect(formatPath(["items", 0, "name"])).toBe("items[0].name");
  });
});

describe("formatIssue", () => {
  test("formats a single issue", () => {
    const issue: ValidationIssue = { path: ["user", "email"], message: "Invalid email", code: "invalid_string" };
    expect(formatIssue(issue)).toBe("user.email: Invalid email (invalid_string)");
  });

  test("formats root-level issue", () => {
    const issue: ValidationIssue = { path: [], message: "Required", code: "invalid_type" };
    expect(formatIssue(issue)).toBe("(root): Required (invalid_type)");
  });
});

describe("formatIssueList", () => {
  test("formats multiple issues with numbering", () => {
    const issues: ValidationIssue[] = [
      { path: ["a"], message: "err1", code: "c1" },
      { path: ["b"], message: "err2", code: "c2" },
    ];
    const result = formatIssueList(issues);
    expect(result).toContain("1. a: err1 (c1)");
    expect(result).toContain("2. b: err2 (c2)");
  });
});

describe("summarizeErrors", () => {
  test("includes count and formatted issues", () => {
    const issues: ValidationIssue[] = [{ path: ["x"], message: "bad", code: "err" }];
    const result = summarizeErrors(issues);
    expect(result).toContain("1 issue");
    expect(result).toContain("x: bad (err)");
  });

  test("uses plural for multiple issues", () => {
    const issues: ValidationIssue[] = [
      { path: ["a"], message: "m1", code: "c1" },
      { path: ["b"], message: "m2", code: "c2" },
    ];
    const result = summarizeErrors(issues);
    expect(result).toContain("2 issues");
  });
});

describe("getDeepestPath", () => {
  test("returns the deepest path", () => {
    const issues: ValidationIssue[] = [
      { path: ["a"], message: "", code: "" },
      { path: ["a", "b", "c"], message: "", code: "" },
      { path: ["x", "y"], message: "", code: "" },
    ];
    expect(getDeepestPath(issues)).toEqual(["a", "b", "c"]);
  });

  test("returns empty array for empty input", () => {
    expect(getDeepestPath([])).toEqual([]);
  });
});

describe("groupIssuesByPath", () => {
  test("groups issues by formatted path", () => {
    const issues: ValidationIssue[] = [
      { path: ["user", "name"], message: "too short", code: "min" },
      { path: ["user", "name"], message: "invalid chars", code: "regex" },
      { path: ["user", "age"], message: "required", code: "required" },
    ];
    const grouped = groupIssuesByPath(issues);
    expect(grouped["user.name"]).toHaveLength(2);
    expect(grouped["user.age"]).toHaveLength(1);
  });

  test("returns empty object for empty input", () => {
    expect(groupIssuesByPath([])).toEqual({});
  });
});
