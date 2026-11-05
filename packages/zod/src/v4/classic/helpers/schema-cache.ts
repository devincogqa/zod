/**
 * Simple caching layer for parsed schema results.
 * Uses a Map-based LRU-like cache with configurable max size.
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class SchemaCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxSize: number;

  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  private buildKey(schema: Record<string, unknown>): string {
    return JSON.stringify(schema);
  }

  get(schema: Record<string, unknown>): T | undefined {
    const key = this.buildKey(schema);
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    return entry.value;
  }

  set(schema: Record<string, unknown>, value: T): void {
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    const key = this.buildKey(schema);
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  has(schema: Record<string, unknown>): boolean {
    return this.cache.has(this.buildKey(schema));
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Number.POSITIVE_INFINITY;

    for (const [key, entry] of this.cache) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}
