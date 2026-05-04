import { expect, test } from "vitest";
import { daysBetween, formatISO, isValidDate, isWeekend, parseISO } from "../../helpers/dateUtils.js";

test("isValidDate validates real dates", () => {
  expect(isValidDate(2024, 0, 15)).toBe(true);
  expect(isValidDate(2024, 1, 29)).toBe(true); // leap year
  expect(isValidDate(2023, 1, 29)).toBe(false); // not a leap year
  expect(isValidDate(2024, 1, 30)).toBe(false);
  expect(isValidDate(2024, 11, 31)).toBe(true);
  expect(isValidDate(2024, 3, 31)).toBe(false); // April has 30 days
});

test("daysBetween returns absolute day difference", () => {
  const a = new Date(2024, 0, 1);
  const b = new Date(2024, 0, 11);
  expect(daysBetween(a, b)).toBe(10);
  expect(daysBetween(b, a)).toBe(10);
  expect(daysBetween(a, a)).toBe(0);
});

test("isWeekend identifies Saturday and Sunday", () => {
  expect(isWeekend(new Date(2024, 0, 6))).toBe(true); // Saturday
  expect(isWeekend(new Date(2024, 0, 7))).toBe(true); // Sunday
  expect(isWeekend(new Date(2024, 0, 8))).toBe(false); // Monday
  expect(isWeekend(new Date(2024, 0, 5))).toBe(false); // Friday
});

test("formatISO formats date as YYYY-MM-DD", () => {
  expect(formatISO(new Date(2024, 0, 5))).toBe("2024-01-05");
  expect(formatISO(new Date(2024, 11, 31))).toBe("2024-12-31");
});

test("parseISO parses valid date strings", () => {
  const d = parseISO("2024-01-15");
  expect(d).not.toBeNull();
  expect(d!.getFullYear()).toBe(2024);
  expect(d!.getMonth()).toBe(0);
  expect(d!.getDate()).toBe(15);
});

test("parseISO rejects malformed strings", () => {
  expect(parseISO("")).toBeNull();
  expect(parseISO("2024/01/15")).toBeNull();
  expect(parseISO("24-01-15")).toBeNull();
  expect(parseISO("2024-1-15")).toBeNull();
});

test("parseISO rejects out-of-range months and days", () => {
  expect(parseISO("2024-13-01")).toBeNull();
  expect(parseISO("2024-00-01")).toBeNull();
  expect(parseISO("2024-01-32")).toBeNull();
  expect(parseISO("2024-01-00")).toBeNull();
});

test("parseISO rejects invalid calendar dates", () => {
  expect(parseISO("2023-02-29")).toBeNull();
  expect(parseISO("2023-02-30")).toBeNull();
  expect(parseISO("2024-04-31")).toBeNull();
  expect(parseISO("2024-02-29")).not.toBeNull(); // leap year
});
