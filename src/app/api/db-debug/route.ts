import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { pushDevSchema } from "@payloadcms/drizzle";

export const dynamic = "force-dynamic";

export async function GET() {
  const logs: string[] = [];
  const originalDbUrl = process.env.DATABASE_URL;
  
  try {
    process.env.IS_BUILDING_DB = "true";
    let dbUrl = process.env.DATABASE_URL || "";
    
    // Rewrite connection URL to the direct IPv6 database host for Drizzle Kit push
    if (dbUrl.includes("supabase.com") || dbUrl.includes("supabase.co")) {
      const match = dbUrl.match(/postgres\.([^:@]+):([^@]+)@/);
      if (match) {
        const projectRef = match[1];
        const password = match[2];
        dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
        logs.push(`Configured connection to direct IPv6 host: db.${projectRef}.supabase.co`);
      }
    }
    process.env.DATABASE_URL = dbUrl;

    // 2. Initialize payload
    logs.push("Initializing payload client...");
    const payload = await getPayloadClient();
    
    // 3. Run schema sync programmatically on direct IPv6 host
    logs.push("Running pushDevSchema programmatically on direct IPv6 host...");
    if ((payload as any).db) {
      await pushDevSchema((payload as any).db);
      logs.push("pushDevSchema completed successfully!");
    } else {
      logs.push("No db adapter found on payload client.");
    }

    // 4. Restore original configuration for subsequent queries
    process.env.DATABASE_URL = originalDbUrl;
    process.env.IS_BUILDING_DB = "false";
    logs.push("Restored database connection to transaction mode pooler.");

    // 5. Query results
    logs.push("Querying projects...");
    const projects = await payload.find({
      collection: "projects" as any,
      limit: 100,
    });

    logs.push("Querying users...");
    const users = await payload.find({
      collection: "users" as any,
      limit: 100,
    });

    const isMock = !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET;

    return NextResponse.json({
      success: true,
      logs,
      isMock,
      databaseUrlDefined: !!process.env.DATABASE_URL,
      projectsCount: projects.totalDocs,
      projectsList: projects.docs.map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        status: p.status,
      })),
      usersCount: users.totalDocs,
      usersList: users.docs.map((u: any) => ({
        id: u.id,
        email: u.email,
      })),
    });
  } catch (err: any) {
    // Make sure we restore variables even on catch
    process.env.DATABASE_URL = originalDbUrl;
    process.env.IS_BUILDING_DB = "false";

    return NextResponse.json({
      success: false,
      logs,
      error: "Failed to debug database",
      message: err.message,
      stack: err.stack,
    }, { status: 500 });
  }
}
