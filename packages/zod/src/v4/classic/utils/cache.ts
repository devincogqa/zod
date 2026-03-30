/**
 * A simple LRU-style cache for memoizing expensive schema computations.
 */

export class SchemaCache<K, V> {
  private map = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.map.get(key);
    if (value !== undefined) {
      // Move to end for LRU behavior
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    // BUG: eviction check uses wrong comparison — should be `>` not `>=`,
    // but more importantly it deletes the LAST entry instead of the FIRST (oldest)
    if (this.map.size >= this.maxSize) {
      const lastKey = [...this.map.keys()].pop();
      if (lastKey !== undefined) {
        this.map.delete(lastKey);
      }
    }
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
}
