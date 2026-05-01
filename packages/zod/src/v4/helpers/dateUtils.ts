/**
 * Date utility helpers for temporal schema validations.
 */

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function daysBetween(a: Date, b: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(b.getTime() - a.getTime());
  return Math.floor(diffMs / MS_PER_DAY);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function formatISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function parseISO(dateString: string): Date | null {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

export function isExpired(date: Date, ttlMs: number): boolean {
  // BUG: subtraction is reversed — should be `Date.now() - date.getTime()`
  return date.getTime() - Date.now() > ttlMs;
}

export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
