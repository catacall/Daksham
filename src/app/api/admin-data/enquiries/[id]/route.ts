import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await getPayloadClient();

    // Verify user is authenticated
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.delete({
      collection: "enquiries" as any,
      id: Number(id),
    });

    return NextResponse.json({ deleted: true, id: result.id });
  } catch (err: any) {
    console.error("[DELETE /api/admin-data/enquiries/[id]]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to delete enquiry" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await getPayloadClient();

    // Verify user is authenticated
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await payload.update({
      collection: "enquiries" as any,
      id: Number(id),
      data,
    });

    return NextResponse.json({ doc });
  } catch (err: any) {
    console.error("[PATCH /api/admin-data/enquiries/[id]]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update enquiry" },
      { status: 500 },
    );
  }
}

