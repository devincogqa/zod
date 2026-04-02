/**
 * Date utility helpers for date validation and formatting
 * within the Zod schema pipeline.
 */

/**
 * Parses a date string in ISO 8601 format and returns a Date object.
 * Returns null if the string is not a valid date.
 * @param dateStr - The date string to parse
 * @returns A Date object or null
 */
export function parseISODate(dateStr: string): Date | null {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
}

/**
 * Checks whether a given year is a leap year.
 * @param year - The year to check
 * @returns true if the year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in a given month of a given year.
 * @param month - The month (1-12)
 * @param year - The year
 * @returns The number of days in the month
 */
export function daysInMonth(month: number, year: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return days[month - 1];
}

/**
 * Formats a Date object as a human-readable string.
 * @param date - The date to format
 * @param locale - The locale to use (default: "en-US")
 * @returns The formatted date string
 */
export function formatDate(date: Date, locale: string = "en-US"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates the difference in days between two dates.
 * @param dateA - The first date
 * @param dateB - The second date
 * @returns The number of days between the two dates
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(dateB.getTime() - dateA.getTime());
  return Math.floor(diffMs / msPerDay);
}

/**
 * Checks if a date falls on a weekend (Saturday or Sunday).
 * @param date - The date to check
 * @returns true if the date is a weekend day
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
