import { NextResponse } from "next/server";
import pg from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "DATABASE_URL is not defined in environment variables" });
    }

    const results: any = {
      databaseUrlLength: dbUrl.length,
      databaseUrlStart: dbUrl.substring(0, 15) + "...",
      databaseUrlEndsWithSsl: dbUrl.includes("sslmode="),
    };

    // 1. Raw Connect
    try {
      const client = new pg.Client({ connectionString: dbUrl });
      await client.connect();
      const res = await client.query("SELECT NOW() as now");
      results.rawConnect = { success: true, result: res.rows[0] };
      await client.end();
    } catch (err: any) {
      results.rawConnect = { success: false, error: err.message };
    }

    // 2. SSL Connect
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
      results.sslConnect = { success: false, error: err.message };
    }

    // 3. Pooler SSL Connect
    try {
      let poolerUrl = dbUrl;
      if (dbUrl.includes("neon.tech") && !dbUrl.includes("-pooler")) {
        poolerUrl = dbUrl.replace(/@(ep-[^.\/:]+)/, "@$1-pooler");
      }
      results.poolerUrl = poolerUrl.substring(0, 15) + "...";
      
      const client = new pg.Client({
        connectionString: poolerUrl,
        ssl: { rejectUnauthorized: false },
      });
      await client.connect();
      const res = await client.query("SELECT NOW() as now");
      results.poolerSslConnect = { success: true, result: res.rows[0] };
      await client.end();
    } catch (err: any) {
      results.poolerSslConnect = { success: false, error: err.message };
    }

    return NextResponse.json(results);
  } catch (globalErr: any) {
    return NextResponse.json({
      error: "Global exception in db-test",
      message: globalErr.message,
      stack: globalErr.stack,
    });
  }
}
