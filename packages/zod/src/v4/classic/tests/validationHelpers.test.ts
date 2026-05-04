import { expect, test } from "vitest";
import {
  isNonEmptyString,
  isPositiveInteger,
  isValidEmail,
  isValidHexColor,
  isValidIPv4,
  isValidURL,
  isValidUUID,
} from "../../helpers/validationHelpers.js";

test("isNonEmptyString accepts non-empty trimmed strings", () => {
  expect(isNonEmptyString("hello")).toBe(true);
  expect(isNonEmptyString("  hi  ")).toBe(true);
  expect(isNonEmptyString("")).toBe(false);
  expect(isNonEmptyString("   ")).toBe(false);
  expect(isNonEmptyString(123)).toBe(false);
  expect(isNonEmptyString(null)).toBe(false);
  expect(isNonEmptyString(undefined)).toBe(false);
});

test("isPositiveInteger only accepts positive integers", () => {
  expect(isPositiveInteger(1)).toBe(true);
  expect(isPositiveInteger(100)).toBe(true);
  expect(isPositiveInteger(0)).toBe(false);
  expect(isPositiveInteger(-1)).toBe(false);
  expect(isPositiveInteger(1.5)).toBe(false);
  expect(isPositiveInteger("1")).toBe(false);
  expect(isPositiveInteger(Number.NaN)).toBe(false);
});

test("isValidEmail accepts well-formed addresses", () => {
  expect(isValidEmail("user@example.com")).toBe(true);
  expect(isValidEmail("first.last+tag@sub.example.co")).toBe(true);
});

test("isValidEmail rejects clearly malformed addresses", () => {
  expect(isValidEmail("")).toBe(false);
  expect(isValidEmail("no-at-sign")).toBe(false);
  expect(isValidEmail("user@")).toBe(false);
  expect(isValidEmail("@example.com")).toBe(false);
  expect(isValidEmail("user@example")).toBe(false);
});

test("isValidURL uses the URL constructor", () => {
  expect(isValidURL("https://example.com")).toBe(true);
  expect(isValidURL("http://example.com/path?q=1")).toBe(true);
  expect(isValidURL("not a url")).toBe(false);
  expect(isValidURL("")).toBe(false);
});

test("isValidUUID accepts canonical UUIDs and rejects malformed ones", () => {
  expect(isValidUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
  expect(isValidUUID("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
  expect(isValidUUID("not-a-uuid")).toBe(false);
  expect(isValidUUID("550e8400-e29b-41d4-a716-44665544000")).toBe(false);
  expect(isValidUUID("550e8400-e29b-61d4-a716-446655440000")).toBe(false); // invalid version
});

test("isValidIPv4 validates dotted-quad addresses", () => {
  expect(isValidIPv4("0.0.0.0")).toBe(true);
  expect(isValidIPv4("127.0.0.1")).toBe(true);
  expect(isValidIPv4("255.255.255.255")).toBe(true);
  expect(isValidIPv4("256.0.0.0")).toBe(false);
  expect(isValidIPv4("1.2.3")).toBe(false);
  expect(isValidIPv4("01.2.3.4")).toBe(false); // leading zero
  expect(isValidIPv4("a.b.c.d")).toBe(false);
});

test("isValidHexColor accepts 3- and 6-digit hex codes", () => {
  expect(isValidHexColor("#fff")).toBe(true);
  expect(isValidHexColor("#FFFFFF")).toBe(true);
  expect(isValidHexColor("#1a2b3c")).toBe(true);
  expect(isValidHexColor("fff")).toBe(false);
  expect(isValidHexColor("#ggg")).toBe(false);
  expect(isValidHexColor("#ffff")).toBe(false);
});
