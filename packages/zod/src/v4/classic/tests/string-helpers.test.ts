import { expect, test } from "vitest";

import {
  countOccurrences,
  isValidEmail,
  isValidURL,
  maskSensitive,
  titleCase,
  toSnakeCase,
  truncate,
} from "../utils/string-helpers.js";

test("isValidURL accepts http and https only", () => {
  expect(isValidURL("https://example.com")).toBe(true);
  expect(isValidURL("http://example.com/path?q=1")).toBe(true);
  expect(isValidURL("ftp://example.com")).toBe(false);
  expect(isValidURL("not a url")).toBe(false);
  expect(isValidURL("")).toBe(false);
});

test("truncate appends ellipsis when too long", () => {
  expect(truncate("hello", 10)).toBe("hello");
  expect(truncate("hello world", 5)).toBe("hello...");
  expect(truncate("abc", 3)).toBe("abc");
});

test("toSnakeCase converts camelCase", () => {
  expect(toSnakeCase("myVariable")).toBe("my_variable");
  expect(toSnakeCase("PascalCase")).toBe("pascal_case");
  expect(toSnakeCase("alreadylower")).toBe("alreadylower");
  expect(toSnakeCase("")).toBe("");
});

test("maskSensitive masks all but last 4 chars", () => {
  expect(maskSensitive("1234567890")).toBe("******7890");
  expect(maskSensitive("abcde")).toBe("*bcde");
  expect(maskSensitive("1234")).toBe("1234");
  expect(maskSensitive("")).toBe("");
});

test("titleCase capitalizes each word", () => {
  expect(titleCase("hello world")).toBe("Hello World");
  expect(titleCase("foo")).toBe("Foo");
  expect(titleCase("")).toBe("");
});

test("countOccurrences counts substring matches", () => {
  expect(countOccurrences("ababab", "ab")).toBe(3);
  expect(countOccurrences("aaaa", "aa")).toBe(2);
  expect(countOccurrences("hello", "x")).toBe(0);
  expect(countOccurrences("anything", "")).toBe(0);
});

test("isValidEmail basic check", () => {
  expect(isValidEmail("a@b.co")).toBe(true);
  expect(isValidEmail("user.name+tag@example.com")).toBe(true);
  expect(isValidEmail("no-at-sign")).toBe(false);
  expect(isValidEmail("missing@dot")).toBe(false);
  expect(isValidEmail("white space@x.co")).toBe(false);
});
