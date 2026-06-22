import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({
      collection: "projects" as any,
      depth: 0,
      pagination: false,
      sort: "-publishedAt",
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ docs: [] }, { status: 500 });
  }
}
