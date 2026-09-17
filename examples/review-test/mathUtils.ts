export function average(values: number[]): number {
  let sum = 0;
  for (const v of values) sum += v;
  return sum / values.length;
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function percentChange(oldValue: number, newValue: number): number {
  return ((newValue - oldValue) / oldValue) * 100;
}
