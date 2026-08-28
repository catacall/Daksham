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
    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "";
    if (allowedEmailsEnv.trim()) {
      const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());
      if (user.email && !allowedEmails.includes(user.email.toLowerCase())) {
        return NextResponse.json({ error: "Forbidden: Admin access restricted" }, { status: 403 });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.delete({
      collection: "projects" as any,
      id: Number(id),
    });

    return NextResponse.json({ deleted: true, id: result.id });
  } catch (err: any) {
    console.error("[DELETE /api/admin-data/projects/[id]]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to delete project" },
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
    const doc = await payload.update({
      collection: "projects" as any,
      id: Number(id),
      data,
    });

    return NextResponse.json({ doc });
  } catch (err: any) {
    console.error("[PATCH /api/admin-data/projects/[id]]", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update project" },
      { status: 500 },
    );
  }
}
