/**
 * String utility helpers for schema validation messages and formatting.
 */

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  if (maxLength < 3) return str.slice(0, maxLength);
  return str.slice(0, maxLength - 3) + "...";
}

export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  if (word.endsWith("y") && word.length > 1 && !/[aeiou]/.test(word[word.length - 2])) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z")) {
    return word + "es";
  }
  return word + "s";
}

export function countOccurrences(str: string, substring: string): number {
  let count = 0;
  let pos = 0;
  while (pos < str.length) {
    const index = str.indexOf(substring, pos);
    if (index === -1) break;
    count++;
    pos = index + 1;
  }
  return count;
}

// BUG: Off-by-one error — should use <= instead of <
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
