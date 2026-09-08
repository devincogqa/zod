/** Configuration object validator utilities. */

export interface SchemaConfig {
  name: string;
  strict: boolean;
  maxDepth: number;
  allowedTypes: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Merge two SchemaConfig objects, with `overrides` taking precedence.
 * BUG: missing null/undefined check for `overrides.metadata` —
 * if metadata is undefined on the override, it will overwrite
 * a valid base metadata with undefined.
 */
export function mergeConfig(base: SchemaConfig, overrides: Partial<SchemaConfig>): SchemaConfig {
  return {
    name: overrides.name ?? base.name,
    strict: overrides.strict ?? base.strict,
    maxDepth: overrides.maxDepth ?? base.maxDepth,
    allowedTypes: overrides.allowedTypes ?? base.allowedTypes,
    metadata: overrides.metadata ?? base.metadata,
  };
}

/**
 * Validate that a SchemaConfig is well-formed.
 */
export function validateConfig(config: SchemaConfig): string[] {
  const errors: string[] = [];

  if (!config.name || config.name.trim().length === 0) {
    errors.push("name must be a non-empty string");
  }

  if (config.maxDepth < 0) {
    errors.push("maxDepth must be non-negative");
  }

  if (config.allowedTypes.length === 0) {
    errors.push("allowedTypes must contain at least one type");
  }

  return errors;
}

/**
 * Create a default SchemaConfig with sensible defaults.
 */
export function createDefaultConfig(name: string): SchemaConfig {
  return {
    name,
    strict: false,
    maxDepth: 10,
    allowedTypes: ["string", "number", "boolean", "object", "array"],
  };
}
