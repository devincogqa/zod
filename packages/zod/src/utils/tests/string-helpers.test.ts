import { expect, test } from "vitest";

import { camelToSnake, capitalize, isValidEmail, reverseString, truncate } from "../string-helpers.js";

// capitalize
test("capitalize uppercases the first letter", () => {
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("world")).toBe("World");
});

test("capitalize handles already capitalized strings", () => {
  expect(capitalize("Hello")).toBe("Hello");
});

test("capitalize handles single character", () => {
  expect(capitalize("a")).toBe("A");
});

test("capitalize handles empty string", () => {
  expect(capitalize("")).toBe("");
});

// truncate
test("truncate shortens string and appends ellipsis", () => {
  expect(truncate("hello world", 5)).toBe("hello...");
});

test("truncate returns original string if within max length", () => {
  expect(truncate("hello", 10)).toBe("hello");
  expect(truncate("hello", 5)).toBe("hello");
});

test("truncate handles empty string", () => {
  expect(truncate("", 5)).toBe("");
});

// camelToSnake
test("camelToSnake converts camelCase to snake_case", () => {
  expect(camelToSnake("helloWorld")).toBe("hello_world");
  expect(camelToSnake("myVariableName")).toBe("my_variable_name");
});

test("camelToSnake handles strings with no uppercase", () => {
  expect(camelToSnake("hello")).toBe("hello");
});

test("camelToSnake handles empty string", () => {
  expect(camelToSnake("")).toBe("");
});

// isValidEmail
test("isValidEmail accepts valid email addresses", () => {
  expect(isValidEmail("user@example.com")).toBe(true);
  expect(isValidEmail("test.user@domain.org")).toBe(true);
  expect(isValidEmail("user+tag@sub.domain.com")).toBe(true);
});

test("isValidEmail rejects invalid email addresses", () => {
  expect(isValidEmail("")).toBe(false);
  expect(isValidEmail("plaintext")).toBe(false);
  expect(isValidEmail("@domain.com")).toBe(false);
  expect(isValidEmail("user@")).toBe(false);
  expect(isValidEmail("user @domain.com")).toBe(false);
});

test("isValidEmail rejects addresses without a dot in domain", () => {
  expect(isValidEmail("user@localhost")).toBe(false);
  expect(isValidEmail("user@x")).toBe(false);
});

// reverseString
test("reverseString reverses a string", () => {
  expect(reverseString("hello")).toBe("olleh");
  expect(reverseString("abc")).toBe("cba");
});

test("reverseString handles single character", () => {
  expect(reverseString("a")).toBe("a");
});

test("reverseString handles empty string", () => {
  expect(reverseString("")).toBe("");
});

test("reverseString handles palindrome", () => {
  expect(reverseString("racecar")).toBe("racecar");
});
