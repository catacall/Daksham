import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import crypto from "crypto";

// ─── Cloudinary Upload → Payload Media Row ────────────────────────────────
// 1. Upload file to Cloudinary (permanent public CDN URLs)
// 2. Insert a row into the `media` table using the pg Pool that Payload
//    already owns (`payload.db.pool`) — no new imports needed.
//    This gives a real integer ID that Payload's `relationship` fields accept.
// 3. Return { id, url } so the admin panel can save valid IDs to projects.
// ───────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // ── Auth ──
    const payload = await getPayload({ config: configPromise });
    const authResult = await payload.auth({ headers: await headers() });
    if (!authResult.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Parse multipart form ──
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string | null) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey    = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary credentials missing in environment variables" },
        { status: 500 },
      );
    }

    // ── Build Cloudinary signed upload ──
    const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const dotIdx    = safeName.lastIndexOf(".");
    const base      = dotIdx >= 0 ? safeName.slice(0, dotIdx) : safeName;
    const uniqueId  = `${base}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const folder    = "daksham";
    const timestamp = Math.round(Date.now() / 1000);

    // Params MUST be sorted alphabetically for signature
    const paramsToSign = `folder=${folder}&public_id=${uniqueId}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    // ── Upload to Cloudinary ──
    const uploadForm = new FormData();
    uploadForm.append("file",      file);
    uploadForm.append("api_key",   apiKey);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("signature", signature);
    uploadForm.append("folder",    folder);
    uploadForm.append("public_id", uniqueId);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm },
    );

    if (!cloudRes.ok) {
      const errText = await cloudRes.text().catch(() => "");
      console.error("[upload] Cloudinary error:", cloudRes.status, errText);
      return NextResponse.json(
        { error: `Cloudinary upload failed (${cloudRes.status}): ${errText}` },
        { status: 500 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloudData: any = await cloudRes.json();
    const imageUrl: string = cloudData.secure_url;
    const fileName = uniqueId;

    // ── Insert row into Payload's media table ──
    // Use payload.db.pool — the real pg Pool instance Payload already owns.
    // This returns a genuine integer `id` that Payload relationship fields accept.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pool = (payload.db as any).pool as import("pg").Pool | undefined;
    const now  = new Date().toISOString();
    let mediaId: number | string = 0;

    if (pool) {
      try {
        const res = await pool.query(
          `INSERT INTO media (alt, url, cloudinary_url, filename, mime_type, filesize, updated_at, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`,
          [
            (alt || file.name).slice(0, 255),
            imageUrl,
            imageUrl, // cloudinaryUrl
            fileName.slice(0, 255),
            (file.type || "image/jpeg").slice(0, 100),
            file.size,
            now,
            now,
          ],
        );
        mediaId = res.rows[0]?.id ?? 0;
        console.log("[upload] Media row created with id:", mediaId);
      } catch (sqlErr: unknown) {
        const msg = sqlErr instanceof Error ? sqlErr.message : String(sqlErr);
        console.error("[upload] SQL insert failed:", msg);
        // Fall back to URL-keyed ID — the image shows in the admin panel
        // but won't persist through the relationship field.
        mediaId = `url:${imageUrl}`;
      }
    } else {
      console.error("[upload] payload.db.pool not available");
      mediaId = `url:${imageUrl}`;
    }

    return NextResponse.json({
      doc: {
        id:       String(mediaId),
        url:      imageUrl,
        filename: fileName,
        alt:      alt || file.name,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Upload failed";
    console.error("[POST /api/admin-data/upload] Upload error:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
