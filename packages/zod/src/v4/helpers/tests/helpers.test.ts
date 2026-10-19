import { expect, test } from "vitest";
import { percentOf } from "../numberUtils.js";
import { stripWhitespace } from "../stringUtils.js";

test("percentOf", () => {
  expect(percentOf(25, 100)).toBe(25);
  expect(percentOf(1, 4)).toBe(25);
  expect(percentOf(150, 100)).toBe(150);
  expect(percentOf(-5, 20)).toBe(-25);
  expect(percentOf(0, 10)).toBe(0);
});

test("percentOf returns 0 when total is 0", () => {
  expect(percentOf(0, 0)).toBe(0);
  expect(percentOf(42, 0)).toBe(0);
});

test("stripWhitespace", () => {
  expect(stripWhitespace(" a\t b\n")).toBe("ab");
  expect(stripWhitespace("no-spaces")).toBe("no-spaces");
  expect(stripWhitespace("a  b   c")).toBe("abc");
});

test("stripWhitespace with empty or whitespace-only input", () => {
  expect(stripWhitespace("")).toBe("");
  expect(stripWhitespace(" \t\r\n ")).toBe("");
});
