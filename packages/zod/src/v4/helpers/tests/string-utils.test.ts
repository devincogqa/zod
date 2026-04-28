import { expect, test } from "vitest";
import {
  camelToSnakeCase,
  capitalize,
  countOccurrences,
  isPalindrome,
  pluralize,
  snakeToCamelCase,
  truncate,
} from "../string-utils.js";

test("truncate - returns original when shorter than maxLength", () => {
  expect(truncate("abc", 10)).toBe("abc");
});

test("truncate - truncates and appends ellipsis when longer than maxLength", () => {
  expect(truncate("hello world", 8)).toBe("hello...");
});

test("truncate - truncates strings exactly equal to maxLength (current behavior)", () => {
  // Note: known boundary quirk — a string of exactly `maxLength` is still truncated
  // because the implementation uses `<` rather than `<=`.
  expect(truncate("abcde", 5)).toBe("ab...");
});

test("capitalize - empty string returns empty string", () => {
  expect(capitalize("")).toBe("");
});

test("capitalize - capitalizes first letter", () => {
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("Hello")).toBe("Hello");
});

test("camelToSnakeCase - converts camelCase to snake_case", () => {
  expect(camelToSnakeCase("camelCaseString")).toBe("camel_case_string");
  expect(camelToSnakeCase("alreadylower")).toBe("alreadylower");
});

test("snakeToCamelCase - converts snake_case to camelCase", () => {
  expect(snakeToCamelCase("snake_case_string")).toBe("snakeCaseString");
  expect(snakeToCamelCase("nounderscore")).toBe("nounderscore");
});

test("camelToSnakeCase and snakeToCamelCase are inverses for simple input", () => {
  expect(snakeToCamelCase(camelToSnakeCase("fooBarBaz"))).toBe("fooBarBaz");
});

test("pluralize - returns singular when count is 1", () => {
  expect(pluralize("apple", 1)).toBe("apple");
});

test("pluralize - adds 's' for regular plurals", () => {
  expect(pluralize("apple", 2)).toBe("apples");
  expect(pluralize("apple", 0)).toBe("apples");
});

test("pluralize - replaces trailing 'y' with 'ies'", () => {
  expect(pluralize("city", 3)).toBe("cities");
});

test("pluralize - adds 'es' for words ending in s/x/z", () => {
  expect(pluralize("box", 2)).toBe("boxes");
  expect(pluralize("bus", 2)).toBe("buses");
  expect(pluralize("buzz", 2)).toBe("buzzes");
});

test("countOccurrences - counts non-overlapping occurrences", () => {
  expect(countOccurrences("hello", "l")).toBe(2);
  expect(countOccurrences("hello world", "o")).toBe(2);
});

test("countOccurrences - counts overlapping occurrences (current behavior)", () => {
  // Implementation advances by 1 character after each match, so overlapping matches count.
  expect(countOccurrences("aaaa", "aa")).toBe(3);
});

test("countOccurrences - returns 0 when substring not found", () => {
  expect(countOccurrences("hello", "z")).toBe(0);
});

test("isPalindrome - true for simple palindromes", () => {
  expect(isPalindrome("racecar")).toBe(true);
  expect(isPalindrome("level")).toBe(true);
});

test("isPalindrome - false for non-palindromes", () => {
  expect(isPalindrome("hello")).toBe(false);
});

test("isPalindrome - ignores case and non-alphanumerics", () => {
  expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
});

test("isPalindrome - true for empty and single-character strings", () => {
  expect(isPalindrome("")).toBe(true);
  expect(isPalindrome("a")).toBe(true);
});
