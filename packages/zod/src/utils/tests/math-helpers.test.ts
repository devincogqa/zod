import { expect, test } from "vitest";

import { average, clamp, inRange, median, roundTo } from "../math-helpers.js";

// clamp
test("clamp restricts value to range", () => {
  expect(clamp(5, 0, 10)).toBe(5);
  expect(clamp(-5, 0, 10)).toBe(0);
  expect(clamp(15, 0, 10)).toBe(10);
});

test("clamp handles value at boundaries", () => {
  expect(clamp(0, 0, 10)).toBe(0);
  expect(clamp(10, 0, 10)).toBe(10);
});

// average
test("average computes mean of numbers", () => {
  expect(average([1, 2, 3, 4, 5])).toBe(3);
  expect(average([10, 20])).toBe(15);
  expect(average([7])).toBe(7);
});

test("average throws on empty array", () => {
  expect(() => average([])).toThrow();
});

// roundTo
test("roundTo rounds to specified decimal places", () => {
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: intentional test value, not Math.PI
  expect(roundTo(3.14159, 2)).toBe(3.14);
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: intentional test value, not Math.PI
  expect(roundTo(3.14159, 4)).toBe(3.1416);
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: intentional test value, not Math.PI
  expect(roundTo(3.14159, 0)).toBe(3);
});

test("roundTo handles negative numbers", () => {
  expect(roundTo(-2.555, 2)).toBe(-2.56);
});

test("roundTo handles zero decimals", () => {
  expect(roundTo(5.9, 0)).toBe(6);
});

// median
test("median returns middle value for odd-length array", () => {
  expect(median([1, 3, 5])).toBe(3);
  expect(median([5, 1, 3])).toBe(3);
});

test("median returns average of two middle values for even-length array", () => {
  expect(median([1, 2, 3, 4])).toBe(2.5);
  expect(median([4, 1, 3, 2])).toBe(2.5);
});

test("median handles single element", () => {
  expect(median([42])).toBe(42);
});

test("median throws on empty array", () => {
  expect(() => median([])).toThrow("Cannot compute median of an empty array");
});

// inRange
test("inRange checks inclusive range", () => {
  expect(inRange(5, 0, 10)).toBe(true);
  expect(inRange(0, 0, 10)).toBe(true);
  expect(inRange(10, 0, 10)).toBe(true);
});

test("inRange returns false for out-of-range values", () => {
  expect(inRange(-1, 0, 10)).toBe(false);
  expect(inRange(11, 0, 10)).toBe(false);
});
