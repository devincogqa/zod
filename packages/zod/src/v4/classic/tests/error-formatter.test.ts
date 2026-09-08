import { expect, test } from "vitest";

import {
  flattenErrors,
  formatError,
  formatErrorSummary,
  formatPath,
  groupByPath,
} from "../utils/error-formatter.js";

test("formatPath renders dot/bracket notation", () => {
  expect(formatPath([])).toBe("(root)");
  expect(formatPath(["a"])).toBe("a");
  expect(formatPath(["a", "b", "c"])).toBe("a.b.c");
  expect(formatPath(["a", 0, "b"])).toBe("a[0].b");
  expect(formatPath([0, "x"])).toBe("[0].x");
});

test("groupByPath groups by top-level segment", () => {
  const groups = groupByPath([
    { path: ["a", "b"], message: "m1", code: "c1" },
    { path: ["a", "c"], message: "m2", code: "c2" },
    { path: ["b"], message: "m3", code: "c3" },
    { path: [], message: "m4", code: "c4" },
  ]);
  expect(groups.get("a")?.length).toBe(2);
  expect(groups.get("b")?.length).toBe(1);
  expect(groups.get("(root)")?.length).toBe(1);
  expect(groups.get("a")?.[0]).toEqual({ path: "a.b", message: "m1", code: "c1" });
});

test("formatErrorSummary handles 0/1/many", () => {
  expect(formatErrorSummary([])).toBe("No validation errors");
  expect(formatErrorSummary([{ path: "a", message: "bad", code: "x" }])).toBe("Validation error at a: bad");
  const multi = formatErrorSummary([
    { path: "a", message: "m1", code: "x" },
    { path: "b", message: "m2", code: "y" },
  ]);
  expect(multi).toContain("2 validation errors");
  expect(multi).toContain("- a: m1");
  expect(multi).toContain("- b: m2");
});

test("formatError builds a FormattedError", () => {
  const result = formatError([
    { path: ["a", 0], message: "m1", code: "c1" },
    { path: [], message: "m2", code: "c2" },
  ]);
  expect(result.count).toBe(2);
  expect(result.issues[0].path).toBe("a[0]");
  expect(result.issues[1].path).toBe("(root)");
  expect(result.summary).toContain("2 validation errors");
});

test("flattenErrors aggregates messages by path", () => {
  const flat = flattenErrors([
    { path: ["a"], message: "m1" },
    { path: ["a"], message: "m2" },
    { path: ["b", 0], message: "m3" },
  ]);
  expect(flat).toEqual({
    a: ["m1", "m2"],
    "b[0]": ["m3"],
  });
});
