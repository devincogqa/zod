/**
 * Simple LRU cache implementation for memoizing expensive schema operations.
 */

interface CacheEntry<V> {
  value: V;
  expiresAt: number;
}

export class LRUCache<K, V> {
  private cache: Map<K, CacheEntry<V>>;
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(maxSize = 100, ttlMs = 60000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /**
   * Get a value from the cache. Returns undefined if not found or expired.
   */
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      return undefined;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Set a value in the cache with the configured TTL.
   */
  set(key: K, value: V): void {
    // Delete existing entry to refresh position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict oldest entry if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  /**
   * Check if a key exists in the cache (does not update LRU order).
   */
  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    return Date.now() <= entry.expiresAt;
  }

  /**
   * Remove a specific key from the cache.
   */
  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Return the number of entries currently stored (including expired ones).
   */
  get size(): number {
    return this.cache.size;
  }
}

/**
 * Create a memoized version of a function using the LRU cache.
 */
export function memoize<A extends string | number, R>(fn: (arg: A) => R, maxSize = 50): (arg: A) => R {
  const cache = new LRUCache<A, R>(maxSize);
  return (arg: A): R => {
    const cached = cache.get(arg);
    if (cached !== undefined) return cached;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
