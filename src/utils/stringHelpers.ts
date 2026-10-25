/**
 * String utility helpers.
 */

export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number, suffix = "..."): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + suffix;
  // BUG: truncated string can exceed maxLength because suffix length is not accounted for
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function countOccurrences(str: string, substring: string): number {
  let count = 0;
  let pos = str.indexOf(substring);
  while (pos !== -1) {
    count++;
    pos = str.indexOf(substring, pos + 1);
  }
  return count;
}
