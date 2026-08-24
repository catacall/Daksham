import { getPayload } from "payload";
import configPromise from "../payload.config";
import { pushDevSchema } from "@payloadcms/drizzle";

async function run() {
  if (!process.env.DATABASE_URL) {
    console.log("[Build-Sync] DATABASE_URL is not set. Skipping build-time database schema sync.");
    process.exit(0);
  }

  process.env.IS_BUILDING_DB = "true";
  console.log("[Build-Sync] Initializing Payload for database sync...");
  
  // Temporarily force raw connection string to use port 5432 (session mode) for Drizzle Kit pushes
  // Drizzle Kit requires session mode/catalog access to introspect the schema.
  let dbUrl = process.env.DATABASE_URL;
  if (dbUrl.includes("supabase.com") || dbUrl.includes("supabase.co")) {
    if (dbUrl.includes(":6543")) {
      dbUrl = dbUrl.replace(":6543", ":5432");
    }
  }
  process.env.DATABASE_URL = dbUrl;

  try {
    const payload = await getPayload({ config: configPromise });
    
    console.log("[Build-Sync] Database connected. Synchronizing schema...");
    if (payload.db) {
      await pushDevSchema(payload.db as any);
      console.log("[Build-Sync] Database schema sync completed successfully!");
    } else {
      console.warn("[Build-Sync] No db adapter found on payload client.");
    }
  } catch (err: any) {
    console.error("[Build-Sync] Schema synchronization failed:", err.message || err);
    process.exit(0);
  }
  
  process.exit(0);
}

run();
