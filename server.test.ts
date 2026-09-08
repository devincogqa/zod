import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "./server";

let server: Server;

beforeAll(() => {
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});

describe("GET /hello", () => {
  it("should return a hello world message", async () => {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Server address is not available");
    }
    const port = address.port;
    const response = await fetch(`http://localhost:${port}/hello`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "Hello, World!" });
  });

  it("should return 404 for unknown routes", async () => {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Server address is not available");
    }
    const port = address.port;
    const response = await fetch(`http://localhost:${port}/unknown`);

    expect(response.status).toBe(404);
  });
});
