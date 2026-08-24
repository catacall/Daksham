import fs from "fs";
import path from "path";

// Prevent automatic pushDevSchema trigger during payload initialization
process.env.PAYLOAD_MIGRATING = "true";

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
  }
} catch (e) {}

async function run() {
  console.log("[Schema-Inspect] Initializing Payload...");
  try {
    const { getPayload } = await import("payload");
    const configModule = await import("../payload.config");
    const configPromise = configModule.default;
    const payload = await getPayload({ config: configPromise });
    
    console.log("[Schema-Inspect] Payload initialized successfully!");
    
    const db = (payload.db as any);
    if (!db) {
      console.log("[Schema-Inspect] No database adapter found.");
      process.exit(0);
    }

    console.log("[Schema-Inspect] Listing tables in the adapter schema:");
    const tables = db.tables || {};
    const tableNames = Object.keys(tables);
    console.log("Total tables defined in Drizzle:", tableNames.length);
    
    const schemas: any = {};
    
    for (const tableName of tableNames) {
      const table = tables[tableName];
      const columns = table.config?.columns || [];
      const colDetails = columns.map((col: any) => ({
        name: col.name,
        dataType: col.dataType,
        columnType: col.columnType,
        notNull: col.notNull,
        isUnique: col.isUnique,
        defaultValue: col.defaultValue,
      }));
      schemas[tableName] = colDetails;
      console.log(`- Table: ${tableName} (${colDetails.length} columns)`);
    }

    fs.writeFileSync(
      path.resolve(process.cwd(), "scratch/drizzle-schema-inspect.json"),
      JSON.stringify(schemas, null, 2)
    );
    console.log("[Schema-Inspect] Schema details written to scratch/drizzle-schema-inspect.json!");
  } catch (err: any) {
    console.error("[Schema-Inspect] Failed:", err.message || err);
  }
  process.exit(0);
}

run();
