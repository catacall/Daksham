import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

// GET — get global site settings (depth 2 for media relations)
export async function GET() {
  try {
    const payload = await getPayloadClient();

    // Verify admin authentication
    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await (payload as any).findGlobal({
      slug: "site-settings",
      depth: 2,
    });

    return NextResponse.json(settings || {});
  } catch (err: any) {
    console.error("[GET /api/admin-data/settings]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// POST / PATCH — update global site settings
export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();

    // Verify admin authentication
    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const updated = await (payload as any).updateGlobal({
      slug: "site-settings",
      data,
      depth: 2,
    });

    return NextResponse.json({ doc: updated, ok: true });
  } catch (err: any) {
    console.error("[POST /api/admin-data/settings]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update settings" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  return POST(req);
}
