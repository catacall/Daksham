import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function GET() {
  const logs: string[] = [];
  
  try {
    // 1. Run database schema sync programmatically using child_process
    logs.push("Starting database schema push...");
    try {
      // Execute npx payload db push using the local node modules in the serverless instance.
      // We set PAYLOAD_CONFIG_PATH to make sure it loads the config.
      const output = execSync("npx payload db push", {
        env: {
          ...process.env,
          // Ensure we don't prompt for confirmation
          PAYLOAD_MIGRATIONS_FORCE: "true",
        },
        encoding: "utf8",
      });
      logs.push("Schema push success: " + output);
    } catch (pushErr: any) {
      logs.push("Schema push failed: " + pushErr.message);
      if (pushErr.stdout) logs.push("Stdout: " + pushErr.stdout);
      if (pushErr.stderr) logs.push("Stderr: " + pushErr.stderr);
    }

    // 2. Initialize Payload and seed/query
    logs.push("Initializing payload client...");
    const payload = await getPayloadClient();
    
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
