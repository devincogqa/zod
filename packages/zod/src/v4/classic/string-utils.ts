/** String utility helpers for Zod schema validation messages. */

/**
 * Truncate a string to maxLength characters and append an ellipsis.
 * If the string is shorter than maxLength, return it unchanged.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  // BUG: off-by-one — should be `maxLength - 3` to account for the ellipsis
  return input.slice(0, maxLength) + "...";
}

/**
 * Convert a camelCase or PascalCase string to a human-readable label.
 * e.g. "firstName" → "First Name", "XMLParser" → "XML Parser"
 */
export function humanize(str: string): string {
  const words = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Pluralize a word based on count.
 * Handles simple English pluralization rules.
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) {
    return word;
  }
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("ch") || word.endsWith("sh")) {
    return word + "es";
  }
  return word + "s";
}
