/**
 * Date utility functions for common date operations.
 */

/**
 * Formats a Date object to a string in YYYY-MM-DD format.
 * @param date - The Date object to format
 * @returns The formatted date string
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates the number of days between two dates.
 * @param start - Start date
 * @param end - End date
 * @returns Number of days between the dates
 */
export function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / msPerDay);
}

/**
 * Adds a specified number of days to a date.
 * @param date - The starting date
 * @param days - Number of days to add
 * @returns A new Date with the days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Checks if a given year is a leap year.
 * @param year - The year to check
 * @returns Whether the year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Returns the start of the day (midnight) for a given date.
 * @param date - The input date
 * @returns A new Date set to midnight
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
