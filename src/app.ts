import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { apiRouter } from "./routes/api.js";

export const app = express();

// --- 1. Security & Logging Middleware ---
app.use(helmet()); // Put the helmet on first
app.use(cors()); // Allow standard cross-origin requests
app.use(morgan("dev")); // Log requests to the terminal in a clean 'dev' format

// --- 2. Standard Middleware ---
app.use(express.json());

// --- 3. Routes ---
app.use("/api", apiRouter);
