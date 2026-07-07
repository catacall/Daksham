import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

// GET — list all projects
export async function GET() {
  try {
    const payload = await getPayloadClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({
      collection: "projects" as any,
      depth: 2,
      pagination: false,
      limit: 100,
      sort: "-publishedAt",
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ docs: [] }, { status: 500 });
  }
}

// POST — create a new project
export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();

    const { user } = await payload.auth({ headers: await headers() });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
