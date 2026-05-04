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
  const errors = [
    { path: "name", message: "Required" },
    { path: "age", message: "Must be positive" },
  ];
  const result = summarizeErrors(errors);
  expect(result).toContain("Found 2 error(s):");
  expect(result).toContain("name: Required");
  expect(result).toContain("age: Must be positive");
});

test("formatTypeName maps known types to capitalized names", () => {
  expect(formatTypeName("string")).toBe("String");
  expect(formatTypeName("number")).toBe("Number");
  expect(formatTypeName("boolean")).toBe("Boolean");
  expect(formatTypeName("unknown")).toBe("unknown");
});

test("truncateList shows all items when under max", () => {
  expect(truncateList(["a", "b"], 5)).toBe("a and b");
});

test("truncateList truncates when over max", () => {
  const result = truncateList(["a", "b", "c", "d", "e"], 2);
  expect(result).toBe("a, b, and 3 more");
});
