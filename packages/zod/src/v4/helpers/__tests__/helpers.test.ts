import { describe, expect, it } from "vitest";
import { isLeapYear, daysInMonth, isValidDate, daysBetween } from "../dateUtils";
import { isEmail, isURL, isUUID, isHexColor, isIPv4 } from "../validationUtils";
import { deepEqual, flattenObject, unflattenObject } from "../objectUtils";
import { joinWithComma, indent, bytesToHuman, maskString } from "../formatUtils";

describe("dateUtils", () => {
  it("should detect leap years", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
  });

  it("should return correct days in month", () => {
    expect(daysInMonth(1, 2024)).toBe(31);
    expect(daysInMonth(2, 2024)).toBe(29);
    expect(daysInMonth(2, 2023)).toBe(28);
    expect(daysInMonth(4, 2024)).toBe(30);
  });

  it("should validate dates", () => {
    expect(isValidDate(2024, 1, 15)).toBe(true);
    expect(isValidDate(2024, 2, 29)).toBe(true);
    expect(isValidDate(2023, 2, 29)).toBe(false);
    expect(isValidDate(2024, 13, 1)).toBe(false);
  });

  it("should calculate days between dates", () => {
    const d1 = new Date("2024-01-01");
    const d2 = new Date("2024-01-10");
    expect(daysBetween(d1, d2)).toBe(9);
  });
});

describe("validationUtils", () => {
  it("should validate email addresses", () => {
    expect(isEmail("user@example.com")).toBe(true);
    expect(isEmail("invalid")).toBe(false);
    expect(isEmail("user@foo..bar.com")).toBe(false);
  });

  it("should validate URLs", () => {
    expect(isURL("https://example.com")).toBe(true);
    expect(isURL("not-a-url")).toBe(false);
    expect(isURL("ftp://files.example.com")).toBe(false);
  });

  it("should validate UUIDs", () => {
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(isUUID("not-a-uuid")).toBe(false);
  });

  it("should validate hex colors", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("#FF5733")).toBe(true);
    expect(isHexColor("red")).toBe(false);
  });

  it("should validate IPv4 addresses", () => {
    expect(isIPv4("192.168.1.1")).toBe(true);
    expect(isIPv4("999.999.999.999")).toBe(false);
    expect(isIPv4("abc")).toBe(false);
  });
});

describe("objectUtils", () => {
  it("should deep-compare objects", () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  it("should flatten objects", () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    expect(flattenObject(obj)).toEqual({ "a.b.c": 1, d: 2 });
  });

  it("should unflatten objects", () => {
    const flat = { "a.b.c": 1, d: 2 };
    expect(unflattenObject(flat)).toEqual({ a: { b: { c: 1 } }, d: 2 });
  });
});

describe("formatUtils", () => {
  it("should join items with commas", () => {
    expect(joinWithComma([])).toBe("");
    expect(joinWithComma(["a"])).toBe("a");
    expect(joinWithComma(["a", "b"])).toBe("a and b");
    expect(joinWithComma(["a", "b", "c"])).toBe("a, b, and c");
  });

  it("should indent text", () => {
    expect(indent("hello\nworld")).toBe("  hello\n  world");
  });

  it("should format bytes", () => {
    expect(bytesToHuman(500)).toBe("500.0 B");
    expect(bytesToHuman(1024)).toBe("1.0 KB");
    expect(bytesToHuman(1048576)).toBe("1.0 MB");
  });

  it("should mask strings", () => {
    expect(maskString("1234567890")).toBe("******7890");
    expect(maskString("abc")).toBe("abc");
  });
});
