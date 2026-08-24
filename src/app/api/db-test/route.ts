import { NextResponse } from "next/server";
import pg from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return NextResponse.json({ error: "DATABASE_URL is not defined in environment variables" });
  }

  // 1. Try connecting with raw pg client (no SSL config)
  const results: any = {};
  
  try {
    const client = new pg.Client({ connectionString: dbUrl });
    await client.connect();
    const res = await client.query("SELECT NOW() as now");
    results.rawConnect = { success: true, result: res.rows[0] };
    await client.end();
  } catch (err: any) {
    results.rawConnect = { success: false, error: err.message, stack: err.stack };
  }

  // 2. Try connecting with SSL configured (rejectUnauthorized: false)
  try {
    const client = new pg.Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    const res = await client.query("SELECT NOW() as now");
    results.sslConnect = { success: true, result: res.rows[0] };
    await client.end();
  } catch (err: any) {
    results.sslConnect = { success: false, error: err.message, stack: err.stack };
  }

  // 3. Try connecting with pooler url
  let poolerUrl = dbUrl;
  if (dbUrl.includes("neon.tech") && !dbUrl.includes("-pooler")) {
    poolerUrl = dbUrl.replace(/@(ep-[^.\/:]+)/, "@$1-pooler");
  }
  results.poolerUrl = poolerUrl;

  try {
    const client = new pg.Client({
      connectionString: poolerUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    const res = await client.query("SELECT NOW() as now");
    results.poolerSslConnect = { success: true, result: res.rows[0] };
    await client.end();
  } catch (err: any) {
    results.poolerSslConnect = { success: false, error: err.message, stack: err.stack };
  }

  return NextResponse.json(results);
}
