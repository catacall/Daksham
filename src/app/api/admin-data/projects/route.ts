import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

// GET — list all projects (admin view, auth required)
export async function GET() {
  try {
    const payload = await getPayloadClient();

    // Auth required — this is the admin data endpoint
    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "anassayyed000@gmail.com";
    const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());
    if (user.email && allowedEmails.length > 0 && !allowedEmails.includes(user.email.toLowerCase())) {
      return NextResponse.json({ error: "Forbidden: Admin access restricted" }, { status: 403 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({
      collection: "projects" as any,
      depth: 2,
      pagination: false,
      limit: 100,
      sort: "-publishedAt",
    });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[GET /api/admin-data/projects]", err);
    return NextResponse.json({ docs: [], error: err?.message || "Failed to fetch projects" }, { status: 500 });
  }
}


// POST — create a new project
export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();

    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "anassayyed000@gmail.com";
    const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());
    if (user.email && allowedEmails.length > 0 && !allowedEmails.includes(user.email.toLowerCase())) {
      return NextResponse.json({ error: "Forbidden: Admin access restricted" }, { status: 403 });
    }

    const data = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await payload.create({
      collection: "projects" as any,
      data,
    });

    return NextResponse.json({ doc });
  } catch (err: any) {
    console.error("[POST /api/admin-data/projects]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create project" },
      { status: 500 },
    );
  }
}
