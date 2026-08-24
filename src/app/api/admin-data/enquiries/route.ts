import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

export async function GET() {
  try {
    const payload = await getPayloadClient();

    // Auth required — this endpoint returns customer PII
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({
      collection: "enquiries" as any,
      depth: 1,
      pagination: false,
      sort: "-createdAt",
      limit: 200,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ docs: [], totalDocs: 0 }, { status: 500 });
  }
}
