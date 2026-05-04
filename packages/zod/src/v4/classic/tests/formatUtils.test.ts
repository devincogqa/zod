import { expect, test } from "vitest";
import {
  formatTypeName,
  indent,
  joinWithComma,
  summarizeErrors,
  truncateList,
  wrapInQuotes,
} from "../../helpers/formatUtils.js";

test("joinWithComma handles empty, single, pair, and many", () => {
  expect(joinWithComma([])).toBe("");
  expect(joinWithComma(["a"])).toBe("a");
  expect(joinWithComma(["a", "b"])).toBe("a and b");
  expect(joinWithComma(["a", "b", "c"])).toBe("a, b, and c");
  expect(joinWithComma(["a", "b", "c", "d"])).toBe("a, b, c, and d");
});

test("indent prefixes every line with the given number of spaces", () => {
  expect(indent("hello", 2)).toBe("  hello");
  expect(indent("a\nb\nc", 4)).toBe("    a\n    b\n    c");
  expect(indent("", 2)).toBe("  ");
});

test("wrapInQuotes wraps with default and custom quote characters", () => {
  expect(wrapInQuotes("hello")).toBe('"hello"');
  expect(wrapInQuotes("hello", "'")).toBe("'hello'");
  expect(wrapInQuotes("hello", "`")).toBe("`hello`");
});

test("summarizeErrors returns a no-errors message when empty", () => {
  expect(summarizeErrors([])).toBe("No errors");
});

test("summarizeErrors lists all errors with counts", () => {
  const summary = summarizeErrors([
    { path: "a", message: "required" },
    { path: "b.c", message: "too short" },
  ]);
  expect(summary).toContain("Found 2 error(s):");
  expect(summary).toContain("- a: required");
  expect(summary).toContain("- b.c: too short");
});

test("formatTypeName maps known types and falls through for unknown", () => {
  expect(formatTypeName("string")).toBe("String");
  expect(formatTypeName("number")).toBe("Number");
  expect(formatTypeName("boolean")).toBe("Boolean");
  expect(formatTypeName("object")).toBe("Object");
  expect(formatTypeName("array")).toBe("Array");
  expect(formatTypeName("null")).toBe("Null");
  expect(formatTypeName("undefined")).toBe("Undefined");
  expect(formatTypeName("custom")).toBe("custom");
});

test("truncateList shows all items when within limit", () => {
  expect(truncateList(["a", "b"], 5)).toBe("a and b");
  expect(truncateList(["a", "b", "c"], 3)).toBe("a, b, and c");
});

test("truncateList summarizes when exceeding limit", () => {
  expect(truncateList(["a", "b", "c", "d", "e"], 2)).toBe("a and b, and 3 more");
});
