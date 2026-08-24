import { NextResponse } from "next/server";
import pg from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return NextResponse.json({ error: "DATABASE_URL is not defined" });
  }

  // Rewrite port to 5432 to test session mode
  let sessionUrl = dbUrl;
  if (dbUrl.includes("supabase.com") || dbUrl.includes("supabase.co")) {
    if (dbUrl.includes(":6543")) {
      sessionUrl = dbUrl.replace(":6543", ":5432");
    }
  }

  const results: any = {};

  // Try running the exact Drizzle Kit query on port 5432
  try {
    const client = new pg.Client({
      connectionString: sessionUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    
    const query = `
      SELECT 
        n.nspname AS table_schema, 
        c.relname AS table_name, 
        CASE 
            WHEN c.relkind = 'r' THEN 'table'
            WHEN c.relkind = 'v' THEN 'view'
            WHEN c.relkind = 'm' THEN 'materialized_view'
        END AS type,
        c.relrowsecurity AS rls_enabled
      FROM 
          pg_catalog.pg_class c
      JOIN 
          pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE 
        c.relkind IN ('r', 'v', 'm') 
        AND n.nspname = 'public';
    `;
    
    const res = await client.query(query);
    results.sessionQuery = { success: true, rowsCount: res.rows.length, rows: res.rows };
    await client.end();
  } catch (err: any) {
    results.sessionQuery = { 
      success: false, 
      error: err.message, 
      code: err.code, 
      detail: err.detail,
      hint: err.hint 
    };
  }

  // Try running the query on port 6543 (transaction mode)
  try {
    const client = new pg.Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    
    const query = `SELECT NOW() as now`;
    const res = await client.query(query);
    results.transactionQuery = { success: true, result: res.rows[0] };
    await client.end();
  } catch (err: any) {
    results.transactionQuery = { 
      success: false, 
      error: err.message, 
      code: err.code 
    };
  }

  return NextResponse.json(results);
}
