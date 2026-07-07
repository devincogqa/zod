// Array utility helpers for schema validation testing.

export function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
