import { expect, test } from "vitest";

import { capitalize, isValidIdentifier, toSnakeCase, truncate } from "../helpers/stringUtils.js";

test("capitalize", () => {
  expect(capitalize("hello")).toEqual("Hello");
  expect(capitalize("Hello")).toEqual("Hello");
  expect(capitalize("h")).toEqual("H");
  expect(capitalize("")).toEqual("");
});

test("truncate", () => {
  expect(truncate("hello", 10)).toEqual("hello");
  expect(truncate("hello", 5)).toEqual("hello");
  expect(truncate("hello world", 8)).toEqual("hello...");
  expect(truncate("hello world", 8).length).toEqual(8);
  expect(truncate("hello world", 3)).toEqual("hel");
  expect(truncate("hello world", 0)).toEqual("");
  expect(() => truncate("hello", -1)).toThrow(RangeError);
});

test("toSnakeCase", () => {
  expect(toSnakeCase("camelCase")).toEqual("camel_case");
  expect(toSnakeCase("PascalCase")).toEqual("pascal_case");
  expect(toSnakeCase("already_snake")).toEqual("already_snake");
  expect(toSnakeCase("simple")).toEqual("simple");
  expect(toSnakeCase("XMLParser")).toEqual("x_m_l_parser");
});

test("isValidIdentifier", () => {
  expect(isValidIdentifier("foo")).toEqual(true);
  expect(isValidIdentifier("_foo")).toEqual(true);
  expect(isValidIdentifier("foo123")).toEqual(true);
  expect(isValidIdentifier("foo_bar")).toEqual(true);
  expect(isValidIdentifier("123foo")).toEqual(false);
  expect(isValidIdentifier("foo-bar")).toEqual(false);
  expect(isValidIdentifier("")).toEqual(false);
  expect(isValidIdentifier("foo bar")).toEqual(false);
});
