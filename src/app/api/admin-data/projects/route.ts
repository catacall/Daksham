import { NextResponse } from "next/server";
import { getPayload } from "payload";
import { headers } from "next/headers";
import configPromise from "@payload-config";

// GET — list all projects
export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
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
    const payload = await getPayload({ config: configPromise });

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
