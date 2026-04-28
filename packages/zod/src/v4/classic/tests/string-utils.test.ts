import { describe, expect, test } from "vitest";

import {
  truncateString,
  capitalizeFirst,
  camelToSnakeCase,
  snakeToCamelCase,
  pluralize,
  padLeft,
  escapeRegex,
} from "../string-utils.js";

describe("truncateString", () => {
  test("returns string unchanged when shorter than maxLength", () => {
    expect(truncateString("hello", 10)).toBe("hello");
  });

  test("returns string unchanged when length equals maxLength", () => {
    expect(truncateString("abc", 3)).toBe("abc");
  });

  test("truncates and adds ellipsis when longer than maxLength", () => {
    expect(truncateString("hello world", 8)).toBe("hello...");
  });

  test("handles empty string", () => {
    expect(truncateString("", 5)).toBe("");
  });
});

describe("capitalizeFirst", () => {
  test("capitalizes first letter", () => {
    expect(capitalizeFirst("hello")).toBe("Hello");
  });

  test("returns empty string unchanged", () => {
    expect(capitalizeFirst("")).toBe("");
  });

  test("handles already capitalized string", () => {
    expect(capitalizeFirst("Hello")).toBe("Hello");
  });
});

describe("camelToSnakeCase", () => {
  test("converts camelCase to snake_case", () => {
    expect(camelToSnakeCase("camelCase")).toBe("camel_case");
  });

  test("converts multiple humps", () => {
    expect(camelToSnakeCase("myLongVariableName")).toBe("my_long_variable_name");
  });

  test("handles no uppercase letters", () => {
    expect(camelToSnakeCase("lowercase")).toBe("lowercase");
  });
});

describe("snakeToCamelCase", () => {
  test("converts snake_case to camelCase", () => {
    expect(snakeToCamelCase("snake_case")).toBe("snakeCase");
  });

  test("converts multiple underscores", () => {
    expect(snakeToCamelCase("my_long_variable_name")).toBe("myLongVariableName");
  });

  test("handles no underscores", () => {
    expect(snakeToCamelCase("simple")).toBe("simple");
  });
});

describe("pluralize", () => {
  test("returns plural for count > 1", () => {
    expect(pluralize("item", 5)).toBe("items");
  });

  test("returns singular for count === 1", () => {
    expect(pluralize("item", 1)).toBe("item");
  });

  test("returns plural for count === 0", () => {
    expect(pluralize("item", 0)).toBe("items");
  });

  test("returns plural for negative count", () => {
    expect(pluralize("item", -1)).toBe("items");
  });
});

describe("padLeft", () => {
  test("pads string to specified length", () => {
    expect(padLeft("5", 3, "0")).toBe("005");
  });

  test("returns string unchanged when already long enough", () => {
    expect(padLeft("hello", 3)).toBe("hello");
  });

  test("uses space as default pad character", () => {
    expect(padLeft("hi", 4)).toBe("  hi");
  });
});

describe("escapeRegex", () => {
  test("escapes special regex characters", () => {
    expect(escapeRegex("a.b*c")).toBe("a\\.b\\*c");
  });

  test("returns plain string unchanged", () => {
    expect(escapeRegex("hello")).toBe("hello");
  });

  test("escapes all special characters", () => {
    const special = ".*+?^${}()|[]\\";
    const escaped = escapeRegex(special);
    expect(new RegExp(escaped).test(special)).toBe(true);
  });
});
