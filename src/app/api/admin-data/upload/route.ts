import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    const authResult = await payload.auth({ headers: await headers() });
    if (!authResult.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string | null) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Deduplicate filename to prevent Postgres unique constraint violations
    let fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    try {
      const existing = await payload.find({
        collection: "media" as any,
        where: { filename: { equals: fileName } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        const ext = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".")) : "";
        const base = fileName.includes(".") ? fileName.slice(0, fileName.lastIndexOf(".")) : fileName;
        fileName = `${base}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${ext}`;
      }
    } catch {
      // If duplicate check fails, just timestamp the file to be safe
      const ext = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".")) : "";
      const base = fileName.includes(".") ? fileName.slice(0, fileName.lastIndexOf(".")) : fileName;
      fileName = `${base}-${Date.now()}${ext}`;
    }

    // Create the media document using Payload's local API
    const media = await payload.create({
      collection: "media" as any,
      data: {
        alt: alt || file.name,
      },
      file: {
        data: buffer,
        name: fileName,
        mimetype: file.type || "application/octet-stream",
        size: file.size,
      },
    });

    return NextResponse.json({ doc: media });
  } catch (error: any) {
    console.error("[POST /api/admin-data/upload] Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
