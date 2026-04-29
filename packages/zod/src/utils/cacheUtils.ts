/**
 * Simple in-memory cache with TTL support for expensive validation operations.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class TTLCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private readonly defaultTTL: number;

  /**
   * @param defaultTTL — default time-to-live in milliseconds
   */
  constructor(defaultTTL: number) {
    this.defaultTTL = defaultTTL;
  }

  /**
   * Retrieve a cached value. Returns undefined if the key is missing or expired.
   */
  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (Date.now() < entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Store a value in the cache with an optional custom TTL.
   */
  set(key: string, value: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl ?? this.defaultTTL);
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Remove a specific key from the cache.
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Remove all expired entries from the cache.
   */
  prune(): void {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Return the number of entries currently in the cache.
   */
  get size(): number {
    return this.store.size;
  }

  /**
   * Clear all entries.
   */
  clear(): void {
    this.store.clear();
  }
}
