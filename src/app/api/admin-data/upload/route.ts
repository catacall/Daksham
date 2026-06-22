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
    const alt = formData.get("alt") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if filename already exists and rename if necessary to prevent Postgres unique constraint violations
    let fileName = file.name;
    const existing = await payload.find({
      collection: "media" as any,
      where: {
        filename: {
          equals: fileName,
        },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const ext = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".")) : "";
      const base = fileName.includes(".") ? fileName.slice(0, fileName.lastIndexOf(".")) : fileName;
      fileName = `${base}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${ext}`;
    }

    // Create the media document using Local API
    const media = await payload.create({
      collection: "media" as any,
      data: {
        alt: alt || file.name || "Uploaded image",
      },
      file: {
        data: buffer,
        name: fileName,
        mimetype: file.type,
        size: file.size,
      },
    });

    return NextResponse.json({ doc: media });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
