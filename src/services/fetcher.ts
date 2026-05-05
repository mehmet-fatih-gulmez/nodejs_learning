// src/services/fetcher.ts
import EventEmitter from "events";
import { pool } from "../db/index.js";
import { type CoinGeckoResponse } from "../types/index.js";

export const priceBus = new EventEmitter();
const TARGET_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

export const state = {
  currentBitcoinPrice: null as number | null,
};

async function fetchPrice() {
  try {
    const response = await fetch(TARGET_URL, {
      headers: { "User-Agent": "MyNodeApp/1.0" },
    });
    if (!response.ok)
      throw new Error(`API rejected request with status: ${response.status}`);

    const parsedData = (await response.json()) as CoinGeckoResponse;

    if (!parsedData?.bitcoin?.usd) {
      throw new Error("API returned an unexpected data structure.");
    }

    const price = parsedData.bitcoin.usd;
    priceBus.emit("priceUpdate", price);
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
  }
}

// Set up the listeners
priceBus.on("priceUpdate", (price: number) => {
  state.currentBitcoinPrice = price;
  console.log(`[LOG] Bitcoin: $${price}`);
});

priceBus.on("priceUpdate", async (price: number) => {
  try {
    await pool.query("INSERT INTO price_history (price) VALUES ($1)", [price]);
  } catch (err: any) {
    console.error("[DB] Insert Error:", err.message);
  }
});

// Export a function to start the engine
export function startBackgroundWorker() {
  setInterval(fetchPrice, 30000);
  fetchPrice();
}
