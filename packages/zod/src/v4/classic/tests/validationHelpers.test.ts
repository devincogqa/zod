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

test("isNonEmptyString accepts non-empty strings", () => {
  expect(isNonEmptyString("hello")).toBe(true);
  expect(isNonEmptyString(" x ")).toBe(true);
});

test("isNonEmptyString rejects empty/whitespace strings and non-strings", () => {
  expect(isNonEmptyString("")).toBe(false);
  expect(isNonEmptyString("   ")).toBe(false);
  expect(isNonEmptyString(123)).toBe(false);
  expect(isNonEmptyString(null)).toBe(false);
});

test("isPositiveInteger accepts positive integers", () => {
  expect(isPositiveInteger(1)).toBe(true);
  expect(isPositiveInteger(100)).toBe(true);
});

test("isPositiveInteger rejects non-positive or non-integer values", () => {
  expect(isPositiveInteger(0)).toBe(false);
  expect(isPositiveInteger(-1)).toBe(false);
  expect(isPositiveInteger(1.5)).toBe(false);
  expect(isPositiveInteger("1")).toBe(false);
});

test("isValidEmail accepts valid emails", () => {
  expect(isValidEmail("user@example.com")).toBe(true);
  expect(isValidEmail("test.user+tag@sub.domain.org")).toBe(true);
});

test("isValidEmail rejects invalid emails", () => {
  expect(isValidEmail("not-an-email")).toBe(false);
  expect(isValidEmail("@example.com")).toBe(false);
  expect(isValidEmail("user@")).toBe(false);
  expect(isValidEmail("user@domainXcom")).toBe(false);
});

test("isValidURL accepts valid URLs", () => {
  expect(isValidURL("https://example.com")).toBe(true);
  expect(isValidURL("http://localhost:3000")).toBe(true);
});

test("isValidURL rejects invalid URLs", () => {
  expect(isValidURL("not a url")).toBe(false);
  expect(isValidURL("")).toBe(false);
});

test("isValidUUID accepts valid v4 UUIDs", () => {
  expect(isValidUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
});

test("isValidUUID rejects invalid UUIDs", () => {
  expect(isValidUUID("not-a-uuid")).toBe(false);
  expect(isValidUUID("550e8400-e29b-61d4-a716-446655440000")).toBe(false); // version 6
});

test("isValidIPv4 accepts valid IPs", () => {
  expect(isValidIPv4("192.168.1.1")).toBe(true);
  expect(isValidIPv4("0.0.0.0")).toBe(true);
  expect(isValidIPv4("255.255.255.255")).toBe(true);
});

test("isValidIPv4 rejects invalid IPs", () => {
  expect(isValidIPv4("256.0.0.1")).toBe(false);
  expect(isValidIPv4("1.2.3")).toBe(false);
  expect(isValidIPv4("01.02.03.04")).toBe(false); // leading zeros
});

test("isValidHexColor accepts valid hex colors", () => {
  expect(isValidHexColor("#fff")).toBe(true);
  expect(isValidHexColor("#FF0000")).toBe(true);
  expect(isValidHexColor("#abc123")).toBe(true);
});

test("isValidHexColor rejects invalid hex colors", () => {
  expect(isValidHexColor("fff")).toBe(false);
  expect(isValidHexColor("#gg0000")).toBe(false);
  expect(isValidHexColor("#12345")).toBe(false);
});
