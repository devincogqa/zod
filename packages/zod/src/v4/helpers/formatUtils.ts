/**
 * Formatting utilities for schema error messages and display values.
 */

export function joinWithCommas(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function indent(text: string, spaces: number = 2): string {
  const padding = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => padding + line)
    .join("\n");
}

export function wrapInQuotes(value: string, quote: "single" | "double" = "double"): string {
  const q = quote === "single" ? "'" : '"';
  return `${q}${value}${q}`;
}

export function summarizeType(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return `array(${value.length})`;
  if (typeof value === "object") return `object(${Object.keys(value).length})`;
  return typeof value;
}

export function byteSize(str: string): number {
  return new TextEncoder().encode(str).length;
}

export function truncateMiddle(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  const half = Math.floor(maxLength / 2);
  return `${str.slice(0, half)}...${str.slice(str.length - half)}`;
}

export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function padLeft(str: string, length: number, char: string = " "): string {
  while (str.length < length) {
    str = char + str;
  }
  return str;
}

export function padRight(str: string, length: number, char: string = " "): string {
  while (str.length < length) {
    str = str + char;
  }
  return str;
}
