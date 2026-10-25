import { expect, test } from "vitest";

import { clamp, inRange, isFiniteInteger, parseNumeric, roundTo } from "../helpers/numberUtils.js";

test("clamp", () => {
  expect(clamp(5, 0, 10)).toEqual(5);
  expect(clamp(-5, 0, 10)).toEqual(0);
  expect(clamp(15, 0, 10)).toEqual(10);
  expect(clamp(0, 0, 10)).toEqual(0);
  expect(clamp(10, 0, 10)).toEqual(10);
});

test("inRange", () => {
  expect(inRange(5, 0, 10)).toEqual(true);
  expect(inRange(0, 0, 10)).toEqual(true);
  expect(inRange(10, 0, 10)).toEqual(true);
  expect(inRange(-1, 0, 10)).toEqual(false);
  expect(inRange(11, 0, 10)).toEqual(false);
});

test("roundTo", () => {
  expect(roundTo(3.14159, 2)).toEqual(3.14);
  expect(roundTo(3.14159, 0)).toEqual(3);
  expect(roundTo(2.5, 0)).toEqual(3);
  expect(roundTo(1234.5678, -2)).toEqual(1200);
});

test("isFiniteInteger", () => {
  expect(isFiniteInteger(5)).toEqual(true);
  expect(isFiniteInteger(0)).toEqual(true);
  expect(isFiniteInteger(-3)).toEqual(true);
  expect(isFiniteInteger(3.5)).toEqual(false);
  expect(isFiniteInteger(Number.NaN)).toEqual(false);
  expect(isFiniteInteger(Number.POSITIVE_INFINITY)).toEqual(false);
});

test("parseNumeric", () => {
  expect(parseNumeric("42")).toEqual(42);
  expect(parseNumeric("3.14")).toEqual(3.14);
  expect(parseNumeric("-7")).toEqual(-7);
  expect(parseNumeric("abc")).toBeUndefined();
  expect(parseNumeric("Infinity")).toBeUndefined();
});
