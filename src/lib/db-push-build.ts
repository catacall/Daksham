import Module from "module";

// Mock next/env to prevent loadEnvConfig destructuring crash on newer Node versions
const originalRequire = (Module.prototype as any).require;
(Module.prototype as any).require = function (id: string) {
  if (id === "next/env") {
    const mock = {
      loadEnvConfig: () => ({ combinedEnv: process.env, loadedEnvFiles: [] }),
    };
    (mock as any).default = mock;
    return mock;
  }
  return originalRequire.apply(this, arguments);
};

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
  
  let dbUrl = process.env.DATABASE_URL;
  if (dbUrl.includes("supabase.com") || dbUrl.includes("supabase.co")) {
    // Extract project ref and password to build direct IPv6 URL
    const match = dbUrl.match(/postgres\.([^:@]+):([^@]+)@/);
    if (match) {
      const projectRef = match[1];
      const password = match[2];
      dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
      console.log("[Build-Sync] Using direct IPv6 database host for migration:", `db.${projectRef}.supabase.co`);
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
