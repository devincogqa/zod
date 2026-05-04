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

test("daysBetween calculates correct differences", () => {
  const a = new Date(2024, 0, 1);
  const b = new Date(2024, 0, 10);
  expect(daysBetween(a, b)).toBe(9);
  expect(daysBetween(b, a)).toBe(9);
  expect(daysBetween(a, a)).toBe(0);
});

test("isWeekend identifies weekends correctly", () => {
  expect(isWeekend(new Date(2024, 0, 6))).toBe(true); // Saturday
  expect(isWeekend(new Date(2024, 0, 7))).toBe(true); // Sunday
  expect(isWeekend(new Date(2024, 0, 8))).toBe(false); // Monday
});

test("formatISO returns YYYY-MM-DD", () => {
  expect(formatISO(new Date(2024, 0, 5))).toBe("2024-01-05");
  expect(formatISO(new Date(2024, 11, 25))).toBe("2024-12-25");
});

test("parseISO parses valid date strings", () => {
  const date = parseISO("2024-01-15");
  expect(date).not.toBeNull();
  expect(date!.getFullYear()).toBe(2024);
  expect(date!.getMonth()).toBe(0);
  expect(date!.getDate()).toBe(15);
});

test("parseISO returns null for invalid formats", () => {
  expect(parseISO("not-a-date")).toBeNull();
  expect(parseISO("2024/01/15")).toBeNull();
  expect(parseISO("2024-13-01")).toBeNull();
  expect(parseISO("2024-00-01")).toBeNull();
  expect(parseISO("2024-01-32")).toBeNull();
});

test("parseISO rejects invalid dates like Feb 30", () => {
  expect(parseISO("2023-02-30")).toBeNull();
  expect(parseISO("2023-02-29")).toBeNull(); // not a leap year
  expect(parseISO("2024-04-31")).toBeNull(); // April has 30 days
});
