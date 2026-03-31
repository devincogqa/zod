/**
 * Date utility helpers for date validation and formatting.
 */

/**
 * Checks if a string is a valid ISO 8601 date.
 */
export function isValidISODate(str: string): boolean {
  const date = new Date(str);
  return !isNaN(date.getTime()) && date.toISOString().startsWith(str.split("T")[0]);
}

/**
 * Returns the difference in days between two dates.
 */
export function diffInDays(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(dateA.getTime() - dateB.getTime());
  return Math.floor(diffMs / msPerDay);
}

/**
 * Formats a Date object as YYYY-MM-DD string.
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a date falls on a weekend.
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Adds a given number of days to a date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
