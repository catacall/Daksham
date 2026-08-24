import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { pushDevSchema } from "@payloadcms/drizzle";

export const dynamic = "force-dynamic";

export async function GET() {
  const logs: string[] = [];
  
  try {
    logs.push("Initializing payload client...");
    const payload = await getPayloadClient();
    
    logs.push("Running pushDevSchema programmatically...");
    if ((payload as any).db) {
      await pushDevSchema((payload as any).db);
      logs.push("pushDevSchema completed successfully!");
    } else {
      logs.push("No db adapter found on payload client.");
    }

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
    return NextResponse.json({
      success: false,
      logs,
      error: "Failed to debug database",
      message: err.message,
      stack: err.stack,
    }, { status: 500 });
  }
}
