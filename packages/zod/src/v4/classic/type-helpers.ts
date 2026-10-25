/**
 * Shared TypeScript type helpers used across schema utilities.
 */

/** Extract the keys of T whose values are assignable to V. */
export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/** Make selected keys of T required while leaving the rest unchanged. */
export type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Deeply make all properties of T readonly. */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** A branded type helper — attaches a phantom brand to a base type. */
declare const __brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [__brand]: B };

/** Utility to assert exhaustive switch/if-else chains at the type level. */
export function assertNever(value: never, message?: string): never {
  throw new Error(message ?? `Unexpected value: ${value}`);
}

/** Narrow an array type to a non-empty tuple. */
export type NonEmptyArray<T> = [T, ...T[]];

/** Type guard for non-empty arrays. */
export function isNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0;
}
