// Stable cache key generation for query params.

export type QueryValue = string | number | boolean | null | undefined;

export function normalizeParams(params: Record<string, QueryValue>): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value === undefined || value === null) continue;
    normalized[key] = String(value);
  }
  return normalized;
}

export function buildQueryKey(path: string, params: Record<string, QueryValue> = {}): string {
  const normalized = normalizeParams(params);
  const parts = Object.keys(normalized).map((key) => `${key}=${normalized[key]}`);
  return `${path}?${parts.join("&")}`;
}

export function parseQueryKey(key: string): { path: string; params: Record<string, string> } {
  const [path, query = ""] = key.split("?");
  const params: Record<string, string> = {};
  for (const part of query.split("&")) {
    if (part.length === 0) continue;
    const [name, value] = part.split("=");
    params[name] = value ?? "";
  }
  return { path, params };
}
