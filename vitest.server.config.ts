import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["server.test.ts"],
    watch: false,
    silent: true,
  },
});
