/**
 * A simple LRU cache for storing validation results.
 * Useful for caching expensive schema validations to avoid
 * redundant parsing of identical inputs.
 */

interface CacheEntry<T> {
  key: string;
  value: T;
  timestamp: number;
}

export class ValidationCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxSize: number;
  private ttlMs: number;

  /**
   * Creates a new ValidationCache.
   * @param maxSize - Maximum number of entries in the cache
   * @param ttlMs - Time-to-live in milliseconds for each entry
   */
  constructor(maxSize: number = 100, ttlMs: number = 60000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /**
   * Retrieves a cached value by key, if it exists and hasn't expired.
   * @param key - The cache key
   * @returns The cached value, or undefined if not found/expired
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    const now = Date.now();
    // BUG: Wrong comparison - should be (now - entry.timestamp > this.ttlMs)
    if (now - entry.timestamp < this.ttlMs) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end for LRU behavior
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Stores a value in the cache.
   * Evicts the oldest entry if the cache is full.
   * @param key - The cache key
   * @param value - The value to cache
   */
  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    if (this.cache.size >= this.maxSize) {
      // Evict oldest entry (first in map)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      key,
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Removes a specific entry from the cache.
   * @param key - The cache key to remove
   * @returns true if the entry was found and removed
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Returns the current number of entries in the cache.
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Removes all expired entries from the cache.
   * @returns The number of entries removed
   */
  prune(): number {
    const now = Date.now();
    let removed = 0;
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > this.ttlMs) {
        this.cache.delete(key);
        removed++;
      }
    }
    return removed;
  }
}
