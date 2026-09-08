/**
 * A tiny LRU cache used by the dummy-review playground.
 */

export class LRUCache<K, V> {
  private readonly capacity: number;
  private readonly store = new Map<K, V>();

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error("capacity must be greater than 0");
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.store.has(key)) return undefined;
    const value = this.store.get(key) as V;
    // Refresh recency by re-inserting at the end.
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    }
    this.store.set(key, value);

    if (this.store.size > this.capacity) {
      const oldest = this.store.keys().next().value as K;
      this.store.delete(oldest);
    }
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  get size(): number {
    return this.store.size;
  }
}
