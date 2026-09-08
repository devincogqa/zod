/**
 * A simple LRU-ish cache for parsed validation results.
 *
 * Intended to speed up hot-path validations where the same input
 * is validated repeatedly against the same schema.
 */

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class ValidationCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxSize: number;
  private ttlMs: number;

  constructor(maxSize = 100, ttlMs = 60_000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /**
   * Retrieve a cached result.
   *
   * BUG: never checks TTL expiry — stale entries are returned indefinitely,
   * which means the cache effectively never expires entries even though
   * `ttlMs` is configured.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    // Should check: if (Date.now() - entry.timestamp > this.ttlMs) { ... delete & return undefined }
    return entry.value;
  }

  /** Store a result in the cache, evicting the oldest entry if full. */
  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  /** Remove a specific key. */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /** Clear the entire cache. */
  clear(): void {
    this.cache.clear();
  }

  /** Number of entries currently in the cache. */
  get size(): number {
    return this.cache.size;
  }
}
