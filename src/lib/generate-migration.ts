import fs from "fs";
import path from "path";

// Manually load .env file
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf8").replace(/\r/g, "");
    envFile.split("\n").forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim();
        process.env[key] = value;
      }
    });
  } else {
    console.log("[Migration-Gen] .env file not found at:", envPath);
  }
} catch (e: any) {
  console.log("[Migration-Gen] .env load error:", e.message);
}

console.log("[Migration-Gen] process.env.DATABASE_URL:", process.env.DATABASE_URL ? "defined (length: " + process.env.DATABASE_URL.length + ")" : "undefined");
console.log("[Migration-Gen] process.env.PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "defined" : "undefined");

import { getPayload } from "payload";

async function run() {
  console.log("[Migration-Gen] Initializing Payload...");
  try {
    // Dynamically import config after env vars are populated
    const configModule = await import("../payload.config");
    const configPromise = configModule.default;
    const config = await configPromise;
    console.log("[Migration-Gen] config.secret value:", config.secret ? "defined" : "empty");
    console.log("[Migration-Gen] process.env.PAYLOAD_SECRET inside run:", process.env.PAYLOAD_SECRET);
    
    const payload = await getPayload({ config: configPromise });
    console.log("[Migration-Gen] Payload initialized. Generating migration...");
    
    if (payload.db && (payload.db as any).createMigration) {
      await (payload.db as any).createMigration({
        payload,
        migrationName: "init_schema",
        force: true,
      });
      console.log("[Migration-Gen] Migration generated successfully!");
    } else {
      console.error("[Migration-Gen] createMigration method not found on db adapter.");
    }
  } catch (err: any) {
    console.error("[Migration-Gen] Generation failed:", err.message || err);
  }
  process.exit(0);
}

run();
