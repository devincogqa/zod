import { expect, test } from "vitest";

import * as z from "zod/v4";

test("z.number() basic validation", () => {
  const schema = z.number();
  expect(schema.parse(1234)).toEqual(1234);
});

test("NaN validation", () => {
  const schema = z.number();
  expect(() => schema.parse(Number.NaN)).toThrow();
});

test("Infinity validation", () => {
  const schema = z.number();
  expect(schema.safeParse(Number.POSITIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse(Number.NEGATIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
});

test(".gt() validation", () => {
  const schema = z.number().gt(0).gt(5);
  expect(schema.parse(6)).toEqual(6);
  expect(() => schema.parse(5)).toThrow();
});

test(".gte() validation", () => {
  const schema = z.number().gt(0).gte(1).gte(5);
  expect(schema.parse(5)).toEqual(5);
  expect(() => schema.parse(4)).toThrow();
});

test(".min() validation", () => {
  const schema = z.number().min(0).min(5);
  expect(schema.parse(5)).toEqual(5);
  expect(() => schema.parse(4)).toThrow();
});

test(".lt() validation", () => {
  const schema = z.number().lte(10).lt(5);
  expect(schema.parse(4)).toEqual(4);
  expect(() => schema.parse(5)).toThrow();
});

test(".lte() validation", () => {
  const schema = z.number().lte(10).lte(5);
  expect(schema.parse(5)).toEqual(5);
  expect(() => schema.parse(6)).toThrow();
});

test(".max() validation", () => {
  const schema = z.number().max(10).max(5);
  expect(schema.parse(5)).toEqual(5);
  expect(() => schema.parse(6)).toThrow();
});

test(".int() validation", () => {
  const schema = z.number().int();
  expect(schema.parse(4)).toEqual(4);
  expect(() => schema.parse(3.14)).toThrow();
});

test(".positive() validation", () => {
  const schema = z.number().positive();
  expect(schema.parse(1)).toEqual(1);
  expect(() => schema.parse(0)).toThrow();
  expect(() => schema.parse(-1)).toThrow();
});

test(".negative() validation", () => {
  const schema = z.number().negative();
  expect(schema.parse(-1)).toEqual(-1);
  expect(() => schema.parse(0)).toThrow();
  expect(() => schema.parse(1)).toThrow();
});

test(".nonpositive() validation", () => {
  const schema = z.number().nonpositive();
  expect(schema.parse(0)).toEqual(0);
  expect(schema.parse(-1)).toEqual(-1);
  expect(() => schema.parse(1)).toThrow();
});

test(".nonnegative() validation", () => {
  const schema = z.number().nonnegative();
  expect(schema.parse(0)).toEqual(0);
  expect(schema.parse(1)).toEqual(1);
  expect(() => schema.parse(-1)).toThrow();
});

test("multipleOf", () => {
  const numbers = {
    number3: 5.123,
    number6: 5.123456,
    number7: 5.1234567,
    number8: 5.12345678,
  };

  const schemas = {
    schema6: z.number().multipleOf(0.000001),
    schema7: z.number().multipleOf(0.0000001),
  };

  expect(() => schemas.schema6.parse(numbers.number3)).not.toThrow();
  expect(() => schemas.schema6.parse(numbers.number6)).not.toThrow();
  expect(() => schemas.schema6.parse(numbers.number7)).toThrow();
  expect(() => schemas.schema6.parse(numbers.number8)).toThrow();
  expect(() => schemas.schema7.parse(numbers.number3)).not.toThrow();
  expect(() => schemas.schema7.parse(numbers.number6)).not.toThrow();
  expect(() => schemas.schema7.parse(numbers.number7)).not.toThrow();
  expect(() => schemas.schema7.parse(numbers.number8)).toThrow();
});

test(".multipleOf() with positive divisor", () => {
  const schema = z.number().multipleOf(5);
  expect(schema.parse(15)).toEqual(15);
  expect(schema.parse(-15)).toEqual(-15);
  expect(() => schema.parse(7.5)).toThrow();
  expect(() => schema.parse(-7.5)).toThrow();
});

test(".multipleOf() with negative divisor", () => {
  const schema = z.number().multipleOf(-5);
  expect(schema.parse(-15)).toEqual(-15);
  expect(schema.parse(15)).toEqual(15);
  expect(() => schema.parse(-7.5)).toThrow();
  expect(() => schema.parse(7.5)).toThrow();
});

test(".multipleOf() with scientific notation (multi-digit exponents)", () => {
  // Regression test for https://github.com/colinhacks/zod/pull/5687
  // The regex was using \d? which only matches single-digit exponents
  const schema = z.number().multipleOf(1e-10);

  // These should all pass - they are valid multiples of 1e-10
  expect(schema.parse(1e-10)).toEqual(1e-10);
  expect(schema.parse(5e-10)).toEqual(5e-10);
  expect(schema.parse(1e-9)).toEqual(1e-9); // 10 * 1e-10

  // Test with 1e-15 (exponent = 15, two digits)
  const schema15 = z.number().multipleOf(1e-15);
  expect(schema15.parse(1e-15)).toEqual(1e-15);
  expect(schema15.parse(3e-15)).toEqual(3e-15);
});

test(".multipleOf() with single-digit exponent (boundary: exponent <= 9)", () => {
  // Single-digit exponents matched correctly even before the fix.
  // Ensure no regression.
  const schema1 = z.number().multipleOf(1e-1);
  expect(schema1.parse(0.3)).toEqual(0.3);
  expect(() => schema1.parse(0.03)).toThrow();

  const schema9 = z.number().multipleOf(1e-9);
  expect(schema9.parse(1e-9)).toEqual(1e-9);
  expect(schema9.parse(5e-9)).toEqual(5e-9);
});

test(".multipleOf() boundary: single-digit vs multi-digit exponent (1e-9 → 1e-10)", () => {
  // 1e-9 has exponent "9" (one digit), 1e-10 has "10" (two digits).
  // This is the exact boundary where the old regex (\d?) broke.
  const schema9 = z.number().multipleOf(1e-9);
  expect(schema9.parse(3e-9)).toEqual(3e-9);

  const schema10 = z.number().multipleOf(1e-10);
  expect(schema10.parse(3e-10)).toEqual(3e-10);
  expect(schema10.parse(1e-9)).toEqual(1e-9); // 1e-9 = 10 * 1e-10
});

test(".multipleOf() with three-digit exponent (1e-100)", () => {
  // Ensures \d+ captures exponents with 3+ digits
  const schema = z.number().multipleOf(1e-100);
  expect(schema.parse(1e-100)).toEqual(1e-100);
  expect(schema.parse(5e-100)).toEqual(5e-100);
});

test(".multipleOf() scientific notation with non-unit coefficients", () => {
  // Step itself has a coefficient other than 1 in scientific notation
  const schema = z.number().multipleOf(5e-11);
  expect(schema.parse(5e-11)).toEqual(5e-11);
  expect(schema.parse(1e-10)).toEqual(1e-10); // 1e-10 = 2 * 5e-11
  expect(schema.parse(1.5e-10)).toEqual(1.5e-10); // 3 * 5e-11
});

test(".multipleOf() scientific notation with zero value", () => {
  // Zero is always a valid multiple of any step
  const schema = z.number().multipleOf(1e-10);
  expect(schema.parse(0)).toEqual(0);

  const schema20 = z.number().multipleOf(1e-20);
  expect(schema20.parse(0)).toEqual(0);
});

test(".multipleOf() scientific notation with negative values", () => {
  const schema = z.number().multipleOf(1e-10);
  expect(schema.parse(-1e-10)).toEqual(-1e-10);
  expect(schema.parse(-5e-10)).toEqual(-5e-10);
  expect(schema.parse(-1e-9)).toEqual(-1e-9);
});

test(".multipleOf() scientific notation rejection cases", () => {
  // Values that are NOT valid multiples should be rejected
  const schema = z.number().multipleOf(3e-10);
  expect(() => schema.parse(7e-10)).toThrow(); // 7 is not divisible by 3
  expect(() => schema.parse(5e-10)).toThrow(); // 5 is not divisible by 3
  expect(() => schema.parse(4e-10)).toThrow(); // 4 is not divisible by 3

  const schema15 = z.number().multipleOf(3e-15);
  expect(() => schema15.parse(2e-15)).toThrow(); // 2 is not divisible by 3
  expect(() => schema15.parse(7e-15)).toThrow(); // 7 is not divisible by 3
});

test(".multipleOf() scientific notation with larger values as multiples of tiny step", () => {
  // Larger numbers that are still valid multiples of a tiny step
  const schema = z.number().multipleOf(1e-10);
  expect(schema.parse(0.5)).toEqual(0.5); // 5e9 * 1e-10
  expect(schema.parse(1)).toEqual(1); // 1e10 * 1e-10
  expect(schema.parse(100)).toEqual(100);
});

test(".step() validation", () => {
  const schemaPointOne = z.number().step(0.1);
  const schemaPointZeroZeroZeroOne = z.number().step(0.0001);
  const schemaSixPointFour = z.number().step(6.4);

  expect(schemaPointOne.parse(6)).toEqual(6);
  expect(schemaPointOne.parse(6.1)).toEqual(6.1);
  expect(schemaSixPointFour.parse(12.8)).toEqual(12.8);
  expect(schemaPointZeroZeroZeroOne.parse(3.01)).toEqual(3.01);
  expect(() => schemaPointOne.parse(6.11)).toThrow();
  expect(() => schemaPointOne.parse(6.1000000001)).toThrow();
  expect(() => schemaSixPointFour.parse(6.41)).toThrow();
});

test(".finite() validation", () => {
  const schema = z.number().finite();
  expect(schema.parse(123)).toEqual(123);
  expect(schema.safeParse(Number.POSITIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse(Number.NEGATIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
});

test(".safe() validation", () => {
  const schema = z.number().safe();
  expect(schema.parse(Number.MIN_SAFE_INTEGER)).toEqual(Number.MIN_SAFE_INTEGER);
  expect(schema.parse(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);
  expect(() => schema.parse(Number.MIN_SAFE_INTEGER - 1)).toThrow();
  expect(() => schema.parse(Number.MAX_SAFE_INTEGER + 1)).toThrow();
});

test("min value getters", () => {
  expect(z.number().minValue).toBeNull;
  expect(z.number().lt(5).minValue).toBeNull;
  expect(z.number().lte(5).minValue).toBeNull;
  expect(z.number().max(5).minValue).toBeNull;
  expect(z.number().negative().minValue).toBeNull;
  expect(z.number().nonpositive().minValue).toBeNull;
  expect(z.number().int().minValue).toBeNull;
  expect(z.number().multipleOf(5).minValue).toBeNull;
  expect(z.number().finite().minValue).toBeNull;
  expect(z.number().gt(5).minValue).toEqual(5);
  expect(z.number().gte(5).minValue).toEqual(5);
  expect(z.number().min(5).minValue).toEqual(5);
  expect(z.number().min(5).min(10).minValue).toEqual(10);
  expect(z.number().positive().minValue).toEqual(0);
  expect(z.number().nonnegative().minValue).toEqual(0);
  expect(z.number().safe().minValue).toEqual(Number.MIN_SAFE_INTEGER);
});

test("max value getters", () => {
  expect(z.number().maxValue).toBeNull;
  expect(z.number().gt(5).maxValue).toBeNull;
  expect(z.number().gte(5).maxValue).toBeNull;
  expect(z.number().min(5).maxValue).toBeNull;
  expect(z.number().positive().maxValue).toBeNull;
  expect(z.number().nonnegative().maxValue).toBeNull;
  expect(z.number().int().minValue).toBeNull;
  expect(z.number().multipleOf(5).minValue).toBeNull;
  expect(z.number().finite().minValue).toBeNull;
  expect(z.number().lt(5).maxValue).toEqual(5);
  expect(z.number().lte(5).maxValue).toEqual(5);
  expect(z.number().max(5).maxValue).toEqual(5);
  expect(z.number().max(5).max(1).maxValue).toEqual(1);
  expect(z.number().negative().maxValue).toEqual(0);
  expect(z.number().nonpositive().maxValue).toEqual(0);
  expect(z.number().safe().maxValue).toEqual(Number.MAX_SAFE_INTEGER);
});

test("int getter", () => {
  expect(z.number().isInt).toEqual(false);
  expect(z.number().int().isInt).toEqual(true);
  expect(z.number().safe().isInt).toEqual(true);
  expect(z.number().multipleOf(5).isInt).toEqual(true);
});

/** In Zod 4, number schemas don't accept infinite values. */
test("finite getter", () => {
  expect(z.number().isFinite).toEqual(true);
});

test("string format methods", () => {
  const a = z.int32().min(5);
  expect(a.parse(6)).toEqual(6);
  expect(() => a.parse(1)).toThrow();
});

test("negative zero edge case", () => {
  const schema = z.number();
  const negativeZero = -0;
  const positiveZero = 0;

  // Both -0 and 0 should be valid (parse succeeds)
  expect(schema.safeParse(negativeZero).success).toBe(true);
  expect(schema.safeParse(positiveZero).success).toBe(true);
  // Note: -0 is normalized to 0 after parsing
  expect(schema.parse(negativeZero) === 0).toBe(true);
  expect(schema.parse(positiveZero)).toEqual(0);

  // With positive() constraint, both should be invalid (0 is not positive)
  const positiveSchema = z.number().positive();
  expect(() => positiveSchema.parse(negativeZero)).toThrow();
  expect(() => positiveSchema.parse(positiveZero)).toThrow();

  // With nonnegative(), both should be valid (0 is non-negative)
  const nonnegativeSchema = z.number().nonnegative();
  expect(nonnegativeSchema.safeParse(negativeZero).success).toBe(true);
  expect(nonnegativeSchema.safeParse(positiveZero).success).toBe(true);
  expect(nonnegativeSchema.parse(negativeZero) === 0).toBe(true);
  expect(nonnegativeSchema.parse(positiveZero)).toEqual(0);
});

test("error customization", () => {
  z.number().gte(5, { error: (iss) => "Min: " + iss.minimum.valueOf() });
  z.number().lte(5, { error: (iss) => "Max: " + iss.maximum.valueOf() });
});
