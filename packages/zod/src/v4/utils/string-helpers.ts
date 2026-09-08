/**
 * String utility helpers for common validation and transformation operations.
 */

export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  if (maxLength <= 3) {
    return input.slice(0, maxLength);
  }
  return input.slice(0, maxLength - 3) + "...";
}

export function capitalize(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function countOccurrences(input: string, search: string): number {
  if (search.length === 0) return 0;
  let count = 0;
  let position = 0;
  while ((position = input.indexOf(search, position)) !== -1) {
    count++;
    position += search.length;
  }
  return count;
}

export function isPalindrome(input: string): boolean {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

export function toCamelCase(input: string): string {
  return input
    .split(/[-_\s]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}
