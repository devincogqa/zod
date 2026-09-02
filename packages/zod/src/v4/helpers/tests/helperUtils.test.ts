import { describe, expect, test } from "vitest";

import { chunk, compact, flatten, groupBy, last, unique } from "../arrayUtils.js";
import { clamp, isInRange, parseNumericString, roundTo, toOrdinal } from "../numberUtils.js";
import { camelToSnake, capitalize, pluralize, snakeToCamel, truncate } from "../stringUtils.js";

describe("arrayUtils", () => {
  test("chunk splits array into groups of given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    expect(chunk([], 3)).toEqual([]);
  });

  test("chunk throws on non-positive size", () => {
    expect(() => chunk([1, 2], 0)).toThrow("chunk size must be at least 1");
    expect(() => chunk([1, 2], -1)).toThrow("chunk size must be at least 1");
  });

  test("unique removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  test("compact removes null and undefined", () => {
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  test("last returns final element", () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  test("groupBy groups by key function", () => {
    expect(groupBy(["one", "two", "three"], (w) => String(w.length))).toEqual({
      "3": ["one", "two"],
      "5": ["three"],
    });
  });

  test("flatten flattens one level", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("numberUtils", () => {
  test("clamp constrains value within bounds", () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(-5, 1, 10)).toBe(1);
    expect(clamp(15, 1, 10)).toBe(10);
    expect(clamp(10, 1, 10)).toBe(10);
    expect(clamp(1, 1, 10)).toBe(1);
  });

  test("isInRange checks inclusive bounds", () => {
    expect(isInRange(5, 1, 10)).toBe(true);
    expect(isInRange(1, 1, 10)).toBe(true);
    expect(isInRange(10, 1, 10)).toBe(true);
    expect(isInRange(0, 1, 10)).toBe(false);
    expect(isInRange(11, 1, 10)).toBe(false);
  });

  test("roundTo rounds to specified decimals", () => {
    expect(roundTo(3.14258, 2)).toBe(3.14);
    expect(roundTo(3.145, 2)).toBe(3.15);
  });

  test("toOrdinal returns correct suffix", () => {
    expect(toOrdinal(1)).toBe("1st");
    expect(toOrdinal(2)).toBe("2nd");
    expect(toOrdinal(3)).toBe("3rd");
    expect(toOrdinal(4)).toBe("4th");
    expect(toOrdinal(11)).toBe("11th");
    expect(toOrdinal(12)).toBe("12th");
    expect(toOrdinal(13)).toBe("13th");
    expect(toOrdinal(21)).toBe("21st");
    expect(toOrdinal(22)).toBe("22nd");
    expect(toOrdinal(23)).toBe("23rd");
  });

  test("parseNumericString parses valid numbers", () => {
    expect(parseNumericString("42")).toBe(42);
    expect(parseNumericString("3.14")).toBe(3.14);
    expect(parseNumericString("abc")).toBeNull();
  });
});

describe("stringUtils", () => {
  test("truncate leaves strings within maxLength unchanged", () => {
    expect(truncate("hello", 5)).toBe("hello");
    expect(truncate("hello", 10)).toBe("hello");
  });

  test("truncate shortens strings exceeding maxLength", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("abcdefghij", 7)).toBe("abcd...");
  });

  test("truncate does not truncate strings at exactly maxLength", () => {
    expect(truncate("12345", 5)).toBe("12345");
  });

  test("capitalize uppercases first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
  });

  test("camelToSnake converts correctly", () => {
    expect(camelToSnake("camelCase")).toBe("camel_case");
    expect(camelToSnake("PascalCase")).toBe("pascal_case");
    expect(camelToSnake("myHTTPClient")).toBe("my_http_client");
    expect(camelToSnake("simple")).toBe("simple");
  });

  test("snakeToCamel converts correctly", () => {
    expect(snakeToCamel("snake_case")).toBe("snakeCase");
    expect(snakeToCamel("my_http_client")).toBe("myHttpClient");
  });

  test("pluralize handles regular words", () => {
    expect(pluralize("cat", 2)).toBe("cats");
    expect(pluralize("cat", 1)).toBe("cat");
  });

  test("pluralize handles consonant+y words", () => {
    expect(pluralize("city", 2)).toBe("cities");
    expect(pluralize("party", 2)).toBe("parties");
  });

  test("pluralize handles vowel+y words", () => {
    expect(pluralize("day", 2)).toBe("days");
    expect(pluralize("key", 2)).toBe("keys");
    expect(pluralize("boy", 2)).toBe("boys");
  });

  test("pluralize handles s/x/z endings", () => {
    expect(pluralize("bus", 2)).toBe("buses");
    expect(pluralize("box", 2)).toBe("boxes");
    expect(pluralize("fez", 2)).toBe("fezes");
  });
});
