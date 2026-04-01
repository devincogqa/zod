/**
 * A simple LRU-like cache for memoizing schema parse results.
 * Helps avoid redundant parsing when the same input is validated multiple times.
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class SchemaCache<K, V> {
  private cache: Map<K, CacheEntry<V>>;
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(maxSize = 100, ttlMs = 60_000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /** Retrieves a cached value if it exists and hasn't expired. */
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }
    const now = Date.now();
    if (now - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  /** Stores a value in the cache, evicting the oldest entry if at capacity. */
  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      // Evict the oldest entry (first inserted)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  /** Checks if a key exists in the cache (ignoring expiration). */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /** Removes a specific key from the cache. */
  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /** Clears all entries from the cache. */
  clear(): void {
    this.cache.clear();
  }

  /** Returns the number of entries currently in the cache. */
  get size(): number {
    return this.cache.size;
  }
}
