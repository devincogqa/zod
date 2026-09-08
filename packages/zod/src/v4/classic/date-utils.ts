/**
 * Date utility helpers for common date operations and formatting.
 */

/**
 * Formats a Date object to YYYY-MM-DD string.
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates the difference in days between two dates.
 */
export function diffInDays(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.abs(a.getTime() - b.getTime());
  return Math.floor(diff / msPerDay);
}

/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Adds a specified number of days to a date, returning a new Date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns true if the given date string is a valid ISO 8601 date.
 */
export function isValidISODate(dateStr: string): boolean {
  const parsed = Date.parse(dateStr);
  return !isNaN(parsed);
}
