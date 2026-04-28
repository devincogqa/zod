/**
 * String utility functions for common validation and transformation operations.
 */

export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

// BUG: off-by-one error — counts words incorrectly for strings with leading/trailing spaces
export function countWords(str: string): number {
  return str.split(" ").length;
}

export function toCamelCase(str: string): string {
  return str
    .split(/[\s_-]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return capitalize(word);
    })
    .join("");
}

export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

export function padStart(str: string, targetLength: number, padChar: string = " "): string {
  while (str.length < targetLength) {
    str = padChar + str;
  }
  return str;
}
