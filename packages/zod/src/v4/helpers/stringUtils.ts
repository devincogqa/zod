/**
 * String utility helpers for schema validation messages and formatting.
 */

export function truncate(str: string, maxLength: number): string {
  // BUG: off-by-one — should be `> maxLength` not `> maxLength - 1`
  if (str.length > maxLength - 1) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}
