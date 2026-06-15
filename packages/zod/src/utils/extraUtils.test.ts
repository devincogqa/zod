import { describe, expect, test } from "vitest";
import { groupBy, keyBy, partition } from "./collectionUtils.js";
import { addDays, isWeekend, toISODate } from "./dateUtils.js";
import { factorial, gcd, sum } from "./mathUtils.js";
import { capitalize, reverseWords, slugify } from "./textUtils.js";

describe("mathUtils", () => {
  test("sum adds all values", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum([])).toBe(0);
  });

  test("factorial computes products", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(() => factorial(-1)).toThrow();
  });

  test("gcd computes greatest common divisor", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(17, 5)).toBe(1);
  });
});

describe("dateUtils", () => {
  test("addDays offsets a date", () => {
    const start = new Date("2024-01-01T00:00:00.000Z");
    expect(toISODate(addDays(start, 5))).toBe("2024-01-06");
  });

  test("isWeekend detects weekends", () => {
    expect(isWeekend(new Date("2024-01-06T00:00:00.000Z"))).toBe(true); // Saturday
    expect(isWeekend(new Date("2024-01-08T00:00:00.000Z"))).toBe(false); // Monday
  });
});

describe("textUtils", () => {
  test("capitalize uppercases the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
  });

  test("slugify produces url-friendly strings", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  test("reverseWords reverses word order", () => {
    expect(reverseWords("the quick brown fox")).toBe("fox brown quick the");
  });
});

describe("collectionUtils", () => {
  test("groupBy groups items by key", () => {
    const grouped = groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"));
    expect(grouped.even).toEqual([2, 4]);
    expect(grouped.odd).toEqual([1, 3]);
  });

  test("partition splits by predicate", () => {
    const [pass, fail] = partition([1, 2, 3, 4], (n) => n > 2);
    expect(pass).toEqual([3, 4]);
    expect(fail).toEqual([1, 2]);
  });

  test("keyBy builds a lookup map", () => {
    const users = [
      { id: "a", name: "Ada" },
      { id: "b", name: "Bob" },
    ];
    expect(keyBy(users, (u) => u.id).b.name).toBe("Bob");
  });
});
