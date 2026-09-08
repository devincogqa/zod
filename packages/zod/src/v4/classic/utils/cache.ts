/**
 * A simple LRU (Least Recently Used) cache implementation for memoizing
 * expensive validation operations.
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class LRUCache<K, V> {
  private cache: Map<K, CacheEntry<V>>;
  private maxSize: number;
  private ttlMs: number;

  /**
   * Creates a new LRU cache.
   * @param maxSize - Maximum number of entries in the cache
   * @param ttlMs - Time-to-live in milliseconds for cache entries (default: 5 minutes)
   */
  constructor(maxSize: number, ttlMs: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /**
   * Gets a value from the cache.
   * @param key - The cache key
   * @returns The cached value, or undefined if not found or expired
   */
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    const now = Date.now();
    if (now - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Sets a value in the cache.
   * @param key - The cache key
   * @param value - The value to cache
   */
  set(key: K, value: V): void {
    // Delete existing entry if present
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // BUG: Memory leak - eviction only happens when cache is OVER maxSize,
    // but it should evict BEFORE adding to maintain maxSize limit.
    // Also, it only evicts one entry, so if maxSize was reduced, it could still overflow.
    this.cache.set(key, { value, timestamp: Date.now() });

    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
  }

  /**
   * Returns the current number of entries in the cache.
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Checks if a key exists in the cache (does not check TTL).
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }
}
