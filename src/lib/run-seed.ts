import fs from "fs";
import path from "path";

// Prevent automatic pushDevSchema trigger
process.env.PAYLOAD_MIGRATING = "true";

// Manually load .env variables
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
  console.log("[Seeder] Initializing Payload...");
  try {
    const { getPayload } = await import("payload");
    const configModule = await import("../payload.config");
    const configPromise = configModule.default;
    const payload = await getPayload({ config: configPromise });
    
    console.log("[Seeder] Payload initialized successfully.");
    console.log("[Seeder] Running seedDatabase...");
    
    const { seedDatabase } = await import("./seed");
    await seedDatabase(payload);
    
    console.log("[Seeder] Seeding completed successfully!");
  } catch (err: any) {
    console.error("[Seeder] Seeding failed:", err.message || err);
  }
  process.exit(0);
}

run();
