import { expect, test } from "vitest";
import { isNonEmptyString, isPositiveInteger } from "../utils";

// isNonEmptyString

test("isNonEmptyString - normal strings", () => {
  expect(isNonEmptyString("hello")).toBe(true);
  expect(isNonEmptyString("a")).toBe(true);
  expect(isNonEmptyString("  hello  ")).toBe(true);
});

test("isNonEmptyString - empty and whitespace strings", () => {
  expect(isNonEmptyString("")).toBe(false);
  expect(isNonEmptyString(" ")).toBe(false);
  expect(isNonEmptyString("  ")).toBe(false);
  expect(isNonEmptyString("\t")).toBe(false);
  expect(isNonEmptyString("\n")).toBe(false);
  expect(isNonEmptyString(" \t\n ")).toBe(false);
});

test("isNonEmptyString - non-string types", () => {
  expect(isNonEmptyString(0)).toBe(false);
  expect(isNonEmptyString(123)).toBe(false);
  expect(isNonEmptyString(null)).toBe(false);
  expect(isNonEmptyString(undefined)).toBe(false);
  expect(isNonEmptyString(true)).toBe(false);
  expect(isNonEmptyString(false)).toBe(false);
  expect(isNonEmptyString({})).toBe(false);
  expect(isNonEmptyString([])).toBe(false);
  expect(isNonEmptyString(Symbol())).toBe(false);
});

// isPositiveInteger

test("isPositiveInteger - positive integers", () => {
  expect(isPositiveInteger(1)).toBe(true);
  expect(isPositiveInteger(100)).toBe(true);
  expect(isPositiveInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
});

test("isPositiveInteger - zero and negative integers", () => {
  expect(isPositiveInteger(0)).toBe(false);
  expect(isPositiveInteger(-0)).toBe(false);
  expect(isPositiveInteger(-1)).toBe(false);
  expect(isPositiveInteger(-100)).toBe(false);
});

test("isPositiveInteger - non-integer numbers", () => {
  expect(isPositiveInteger(1.5)).toBe(false);
  expect(isPositiveInteger(0.1)).toBe(false);
  expect(isPositiveInteger(-1.5)).toBe(false);
});

test("isPositiveInteger - special numeric values", () => {
  expect(isPositiveInteger(NaN)).toBe(false);
  expect(isPositiveInteger(Infinity)).toBe(false);
  expect(isPositiveInteger(-Infinity)).toBe(false);
});

test("isPositiveInteger - non-number types", () => {
  expect(isPositiveInteger("1")).toBe(false);
  expect(isPositiveInteger("hello")).toBe(false);
  expect(isPositiveInteger(null)).toBe(false);
  expect(isPositiveInteger(undefined)).toBe(false);
  expect(isPositiveInteger(true)).toBe(false);
  expect(isPositiveInteger(false)).toBe(false);
  expect(isPositiveInteger({})).toBe(false);
  expect(isPositiveInteger([])).toBe(false);
});
