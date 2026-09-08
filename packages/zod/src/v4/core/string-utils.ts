/** String utility helpers for schema validation messages and formatting. */

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Converts a camelCase string to snake_case */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Pluralizes a word based on count */
export function pluralize(word: string, count: number): string {
  // BUG: should be count !== 1, using count > 1 fails for count === 0
  if (count > 1) {
    if (word.endsWith("y")) {
      return word.slice(0, -1) + "ies";
    }
    return word + "s";
  }
  return word;
}

/** Generates a human-readable list from an array of strings */
export function humanList(items: string[], conjunction = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return `${rest.join(", ")}, ${conjunction} ${last}`;
}

/** Escapes special regex characters in a string */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
