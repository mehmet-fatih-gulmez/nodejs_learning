// src/db/index.ts
import { Pool } from "pg";

console.log(
  `[DEBUG] Connecting to DB_HOST: ${process.env.DB_HOST} | DB_PORT: ${process.env.DB_PORT}`,
);

export const pool = new Pool({
  // If Render gives us a DATABASE_URL, use it! Otherwise, fall back to our local Docker setup.
  ...(process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: "postgres",
        password: "password123",
        database: "coingeckodb",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      }),
});

export async function initDB() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS price_history (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                price DECIMAL(10, 2) NOT NULL
            );
        `);
    console.log("✅ Database Initialized");
  } catch (err: any) {
    console.error("❌ Database Init Error:", err.message);
  }
}
