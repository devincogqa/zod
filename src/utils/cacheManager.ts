/**
 * A simple in-memory cache with TTL (time-to-live) support.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheManager<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTtlMs: number;

  /**
   * Creates a new CacheManager.
   * @param defaultTtlMs - Default time-to-live in milliseconds (default: 5 minutes).
   */
  constructor(defaultTtlMs: number = 5 * 60 * 1000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  /**
   * Stores a value in the cache with an optional custom TTL.
   */
  set(key: string, value: T, ttlMs?: number): void {
    const ttl = ttlMs ?? this.defaultTtlMs;
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Retrieves a value from the cache.
   * Returns undefined if the key doesn't exist or has expired.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Checks if a key exists and is not expired in the cache.
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Removes a specific key from the cache.
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
   * Returns the number of entries in the cache (including expired ones).
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Removes all expired entries from the cache.
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}
