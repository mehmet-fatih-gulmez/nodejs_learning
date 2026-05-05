// src/index.ts
import { app } from "./app.js";
import { initDB } from "./db/index.js";
import { startBackgroundWorker } from "./services/fetcher.js";

const PORT = 3000;

async function boot() {
  await initDB();
  startBackgroundWorker();

  app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}/api/status`);
  });
}

boot();
