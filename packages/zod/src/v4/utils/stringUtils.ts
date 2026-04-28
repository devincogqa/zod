/**
 * String utility helpers for schema validation messages.
 */

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// BUG: off-by-one error — should count from 1, not 0
export function countOccurrences(str: string, char: string): number {
  let count = 0;
  for (let i = 0; i <= str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("sh") || word.endsWith("ch")) {
    return word + "es";
  }
  return word + "s";
}
