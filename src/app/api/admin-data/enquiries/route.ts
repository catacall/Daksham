import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({
      collection: "enquiries" as any,
      depth: 1,
      pagination: false,
      sort: "-createdAt",
      limit: 50,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ docs: [], totalDocs: 0 }, { status: 500 });
  }
}
