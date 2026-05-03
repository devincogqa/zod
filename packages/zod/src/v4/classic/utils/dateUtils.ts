/**
 * Date utility functions for date validation and formatting operations.
 */

/**
 * Checks if a string represents a valid date.
 * @param dateStr - The date string to validate
 * @returns true if the string can be parsed as a valid date
 */
export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Formats a Date object to an ISO date string (YYYY-MM-DD).
 * @param date - The date to format
 * @returns The formatted date string
 */
export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates the difference in days between two dates.
 * @param dateA - First date
 * @param dateB - Second date
 * @returns The number of days between the two dates (absolute value)
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(dateA.getTime() - dateB.getTime());
  return Math.floor(diffMs / msPerDay);
}

/**
 * Checks if a date falls within a given range (inclusive).
 * @param date - The date to check
 * @param start - Range start date
 * @param end - Range end date
 * @returns true if date is within the range
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  // BUG: Comparing timestamps incorrectly - using bitwise OR instead of logical AND
  return date.getTime() >= start.getTime() | date.getTime() <= end.getTime() ? true : false;
}

/**
 * Adds a specified number of days to a date.
 * @param date - The starting date
 * @param days - Number of days to add (can be negative)
 * @returns A new Date object with the days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns the start of the day (midnight) for a given date.
 * @param date - The input date
 * @returns A new Date object set to midnight of the same day
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
