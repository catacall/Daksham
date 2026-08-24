import fs from "fs";
import path from "path";

// Prevent automatic pushDevSchema trigger
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
  console.log("[Inspector] Initializing Payload...");
  try {
    const { getPayload } = await import("payload");
    const configModule = await import("../payload.config");
    const configPromise = configModule.default;
    const payload = await getPayload({ config: configPromise });
    
    console.log("[Inspector] Payload initialized successfully.");
    const db = (payload.db as any);
    if (!db || !db.tables) {
      console.error("No tables found in database adapter.");
      process.exit(1);
    }

    const { getTableConfig } = await import("drizzle-orm/pg-core");
    const { getTableName } = await import("drizzle-orm");

    const tableNames = Object.keys(db.tables);
    console.log(`Found ${tableNames.length} tables in Drizzle schema.`);

    const sqlStatements: string[] = [];

    // Order tables so parent tables (like media) are created before child tables (which have foreign keys)
    // We can do this by prioritizing media first, then others.
    const orderedTableNames = [
      "media",
      "users",
      "enquiries",
      "site_settings",
      ...tableNames.filter(t => !["media", "users", "enquiries", "site_settings"].includes(t))
    ];

    for (const name of orderedTableNames) {
      const table = db.tables[name];
      if (!table) continue;

      const config = getTableConfig(table);
      const tableName = getTableName(table);
      
      console.log(`Inspecting Table: ${tableName}`);
      
      const columnDefinitions: string[] = [];
      
      config.columns.forEach((col: any) => {
        let typeStr = col.getSQLType();
        
        // Handle custom overrides or data types
        if (col.columnType === "PgSerial") {
          typeStr = "serial";
        }
        
        let colDef = `"${col.name}" ${typeStr}`;
        
        if (col.notNull) {
          colDef += " NOT NULL";
        }
        
        if (col.isUnique) {
          colDef += " UNIQUE";
        }
        
        if (col.primary) {
          colDef += " PRIMARY KEY";
        }
        
        if (col.default !== undefined) {
          if (typeof col.default === "string" && !col.default.includes("now()") && !col.default.includes("::")) {
            colDef += ` DEFAULT '${col.default}'`;
          } else if (col.default !== null) {
            colDef += ` DEFAULT ${col.default}`;
          }
        }
        
        columnDefinitions.push(colDef);
      });

      // Handle foreign keys from Drizzle
      config.foreignKeys.forEach((fk: any) => {
        const reference = fk.reference();
        const localColumns = reference.columns.map((c: any) => `"${c.name}"`).join(", ");
        const foreignTable = getTableName(reference.foreignTable);
        const foreignColumns = reference.foreignColumns.map((c: any) => `"${c.name}"`).join(", ");
        
        let fkConstraint = `FOREIGN KEY (${localColumns}) REFERENCES "${foreignTable}"(${foreignColumns})`;
        if (reference.onDelete) {
          fkConstraint += ` ON DELETE ${reference.onDelete.toUpperCase()}`;
        }
        if (reference.onUpdate) {
          fkConstraint += ` ON UPDATE ${reference.onUpdate.toUpperCase()}`;
        }
        
        columnDefinitions.push(fkConstraint);
      });

      let createTableSql = `CREATE TABLE IF NOT EXISTS "${tableName}" (\n  ${columnDefinitions.join(",\n  ")}\n);`;
      sqlStatements.push(createTableSql);
    }

    const fullSql = sqlStatements.join("\n\n");
    fs.writeFileSync(path.resolve(process.cwd(), "drizzle-schema.sql"), fullSql);
    console.log("[Inspector] SQL schema written successfully to drizzle-schema.sql!");
  } catch (err: any) {
    console.error("[Inspector] Failed:", err.message || err);
  }
  process.exit(0);
}

run();
