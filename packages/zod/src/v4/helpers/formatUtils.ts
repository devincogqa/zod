/**
 * Formatting utility helpers for error messages and schema descriptions.
 */

export function joinWithComma(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  const allButLast = items.slice(0, -1).join(", ");
  return `${allButLast}, and ${items[items.length - 1]}`;
}

export function indent(text: string, spaces: number): string {
  const padding = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => padding + line)
    .join("\n");
}

export function wrapInQuotes(value: string, quoteChar = '"'): string {
  return `${quoteChar}${value}${quoteChar}`;
}

export function summarizeErrors(errors: { path: string; message: string }[]): string {
  if (errors.length === 0) return "No errors";

  let result = "";
  let error: { path: string; message: string };
  for (error of errors) {
    result += `  - ${error.path}: ${error.message}\n`;
  }

  const summary = `Found ${errors.length} error(s):\n${result}`;
  return summary;
}

export function formatTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    string: "String",
    number: "Number",
    boolean: "Boolean",
    object: "Object",
    array: "Array",
    null: "Null",
    undefined: "Undefined",
  };
  return typeMap[type] ?? type;
}

export function truncateList(items: string[], maxItems: number): string {
  if (items.length <= maxItems) {
    return joinWithComma(items);
  }
  const shown = items.slice(0, maxItems);
  const remaining = items.length - maxItems;
  return `${shown.join(", ")}, and ${remaining} more`;
}
