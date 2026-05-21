/**
 * String utility helpers for common validation patterns.
 */

export function truncateString(str: string, maxLength: number): string {
  if (str.length < maxLength) {
    // BUG: should be <= maxLength, this truncates strings that are exactly maxLength
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
}

export function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function countOccurrences(str: string, substring: string): number {
  if (!substring) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substring, pos)) !== -1) {
    count++;
    pos += substring.length;
  }
  return count;
}

export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}
