/**
 * Formatting utility helpers for schema error messages and display.
 */

export function joinWithCommas(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function indent(text: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => prefix + line)
    .join("\n");
}

export function wrapInQuotes(value: string, quote: "single" | "double" = "double"): string {
  const q = quote === "single" ? "'" : '"';
  return `${q}${value}${q}`;
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function byteSize(str: string): number {
  return new TextEncoder().encode(str).length;
}

export function summarizeType(type: string): string {
  const typeMap: Record<string, string> = {
    string: "str",
    number: "num",
    boolean: "bool",
    undefined: "undef",
    object: "obj",
    function: "fn",
  };
  return typeMap[type] ?? type;
}
