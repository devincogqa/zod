/**
 * Date utility helpers for date/time schema validations.
 */

export function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month, day);
  date.setFullYear(year);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.abs(date2.getTime() - date1.getTime());
  return Math.round(diff / msPerDay);
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function formatISO(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISO(dateString: string): Date | null {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  if (!isValidDate(year, month - 1, day)) return null;

  const result = new Date(year, month - 1, day);
  result.setFullYear(year);
  return result;
}
