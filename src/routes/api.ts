// src/routes/api.ts
import { Router, type Request, type Response } from "express";
import { pool } from "../db/index.js";
import { state } from "../services/fetcher.js";
import { type PriceRecord } from "../types/index.js";

export const apiRouter = Router();

apiRouter.get("/status", (req: Request, res: Response) => {
  if (!state.currentBitcoinPrice) {
    res.status(503).json({ error: "Fetching initial data..." });
    return;
  }
  res.json({ asset: "Bitcoin", currentPrice: state.currentBitcoinPrice });
});

apiRouter.get("/history", async (req: Request, res: Response) => {
  try {
    const result = await pool.query<PriceRecord>(
      "SELECT * FROM price_history ORDER BY timestamp DESC LIMIT 10",
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: "Database query failed" });
  }
});
