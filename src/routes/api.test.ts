import request from "supertest";
import { app } from "../app.js";
// Import the state object directly!
import { state } from "../services/fetcher.js";
import { describe, it, expect } from "vitest";

describe("API Routes", () => {
  it("GET /api/status should return 503 if data is not ready", async () => {
    // Mutate the property inside the object
    state.currentBitcoinPrice = null;

    const response = await request(app).get("/api/status");

    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty("error", "Fetching initial data...");
  });

  it("GET /api/status should return 200 and the price if data is ready", async () => {
    // Inject the fake price into the object
    state.currentBitcoinPrice = 85000;

    const response = await request(app).get("/api/status");
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("asset", "Bitcoin");
    expect(response.body).toHaveProperty("currentPrice", 85000);
  });
});
