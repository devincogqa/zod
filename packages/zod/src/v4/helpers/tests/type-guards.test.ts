import { expect, test } from "vitest";
import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isInteger,
  isNonEmptyString,
  isNull,
  isNullish,
  isNumber,
  isNumericString,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isString,
  isUndefined,
} from "../type-guards.js";

test("isString - true for strings only", () => {
  expect(isString("a")).toBe(true);
  expect(isString("")).toBe(true);
  expect(isString(1)).toBe(false);
  expect(isString(null)).toBe(false);
});

test("isNumber - true for finite numbers, false for NaN", () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber(0)).toBe(true);
  expect(isNumber(Number.NaN)).toBe(false);
  expect(isNumber("1")).toBe(false);
});

test("isBoolean", () => {
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(0)).toBe(false);
});

test("isNull / isUndefined / isNullish", () => {
  expect(isNull(null)).toBe(true);
  expect(isNull(undefined)).toBe(false);
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined(null)).toBe(false);
  expect(isNullish(null)).toBe(true);
  expect(isNullish(undefined)).toBe(true);
  expect(isNullish(0)).toBe(false);
});

test("isObject - true for plain objects, false for arrays/null", () => {
  expect(isObject({})).toBe(true);
  expect(isObject({ a: 1 })).toBe(true);
  expect(isObject([])).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject("a")).toBe(false);
});

test("isArray", () => {
  expect(isArray([])).toBe(true);
  expect(isArray([1, 2])).toBe(true);
  expect(isArray({})).toBe(false);
});

test("isDate", () => {
  expect(isDate(new Date())).toBe(true);
  expect(isDate("2020-01-01")).toBe(false);
});

test("isRegExp", () => {
  expect(isRegExp(/x/)).toBe(true);
  expect(isRegExp("x")).toBe(false);
});

test("isPromise", () => {
  expect(isPromise(Promise.resolve(1))).toBe(true);
  expect(isPromise({ then: () => {} })).toBe(false);
});

test("isFunction", () => {
  expect(isFunction(() => 0)).toBe(true);
  expect(isFunction(function () {})).toBe(true);
  expect(isFunction({})).toBe(false);
});

test("isInteger", () => {
  expect(isInteger(1)).toBe(true);
  expect(isInteger(1.5)).toBe(false);
  expect(isInteger("1")).toBe(false);
});

test("isNumericString - true for fully numeric strings", () => {
  expect(isNumericString("123")).toBe(true);
  expect(isNumericString("3.14")).toBe(true);
  expect(isNumericString("-1")).toBe(true);
});

test("isNumericString - false for non-strings and non-numeric strings", () => {
  expect(isNumericString(123)).toBe(false);
  expect(isNumericString("abc")).toBe(false);
  expect(isNumericString("")).toBe(false);
});

test("isNumericString - rejects strings with trailing non-numeric chars", () => {
  // Number('123abc') is NaN, so this correctly returns false.
  expect(isNumericString("123abc")).toBe(false);
});

test("isNonEmptyString", () => {
  expect(isNonEmptyString("a")).toBe(true);
  expect(isNonEmptyString("")).toBe(false);
  expect(isNonEmptyString(0)).toBe(false);
});

test("isPlainObject - true for object literals, false for class instances", () => {
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject({ a: 1 })).toBe(true);
  expect(isPlainObject(Object.create(null))).toBe(true);
  expect(isPlainObject(new Date())).toBe(false);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(null)).toBe(false);
});
