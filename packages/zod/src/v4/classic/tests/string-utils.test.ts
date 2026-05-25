import { expect, test } from "vitest";

import {
  truncate,
  toSnakeCase,
  maskString,
  isHexColor,
  normalizeWhitespace,
} from "../string-utils";

test("truncate — short strings returned unchanged", () => {
  expect(truncate("hi", 10)).toBe("hi");
});

test("truncate — long strings are cut", () => {
  expect(truncate("hello world", 5)).toBe("hello…");
});

test("toSnakeCase — camelCase", () => {
  expect(toSnakeCase("helloWorld")).toBe("hello_world");
});

test("toSnakeCase — PascalCase", () => {
  expect(toSnakeCase("HelloWorld")).toBe("hello_world");
});

test("toSnakeCase — already snake_case", () => {
  expect(toSnakeCase("hello_world")).toBe("hello_world");
});

test("maskString — short visible count", () => {
  expect(maskString("4111111111111111", 4)).toBe("************1111");
});

test("maskString — visible count >= length returns original", () => {
  expect(maskString("abc", 5)).toBe("abc");
});

test("isHexColor — valid", () => {
  expect(isHexColor("#ff00aa")).toBe(true);
  expect(isHexColor("#000000")).toBe(true);
});

test("isHexColor — invalid", () => {
  expect(isHexColor("#ggg")).toBe(false);
  expect(isHexColor("ff00aa")).toBe(false);
  expect(isHexColor("#ff00aabb")).toBe(false);
});

test("normalizeWhitespace", () => {
  expect(normalizeWhitespace("  hello   world  ")).toBe("hello world");
  expect(normalizeWhitespace("no\textra\nspaces")).toBe("no extra spaces");
});
