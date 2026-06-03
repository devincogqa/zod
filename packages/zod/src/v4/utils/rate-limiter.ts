/**
 * A simple token-bucket rate limiter implementation.
 */

export interface RateLimiterOptions {
  /** Maximum number of tokens in the bucket */
  maxTokens: number;
  /** Number of tokens added per refill interval */
  refillRate: number;
  /** Refill interval in milliseconds */
  refillInterval: number;
}

export class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private refillInterval: number;
  private lastRefillTime: number;

  constructor(options: RateLimiterOptions) {
    this.maxTokens = options.maxTokens;
    this.tokens = options.maxTokens;
    this.refillRate = options.refillRate;
    this.refillInterval = options.refillInterval;
    this.lastRefillTime = Date.now();
  }

  /**
   * Attempts to consume a token. Returns true if allowed, false if rate-limited.
   */
  tryConsume(tokens: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  /**
   * Returns the number of tokens currently available.
   */
  getAvailableTokens(): number {
    this.refill();
    return this.tokens;
  }

  /**
   * Returns the time in ms until the next token will be available.
   */
  getTimeUntilNextToken(): number {
    if (this.tokens > 0) return 0;
    const elapsed = Date.now() - this.lastRefillTime;
    const remaining = this.refillInterval - elapsed;
    return Math.max(0, remaining);
  }

  /**
   * Resets the rate limiter to full capacity.
   */
  reset(): void {
    this.tokens = this.maxTokens;
    this.lastRefillTime = Date.now();
  }

  /**
   * Refills tokens based on elapsed time.
   */
  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefillTime;
    const intervals = Math.floor(elapsed / this.refillInterval);

    if (intervals > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + intervals * this.refillRate);
      this.lastRefillTime = now;
    }
  }
}
