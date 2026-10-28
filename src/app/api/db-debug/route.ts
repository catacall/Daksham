import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";

export const dynamic = "force-dynamic";

/**
 * Database health check for diagnosing "Unable to load projects" errors.
 *
 * Protected: set DEBUG_KEY in your Vercel environment variables, then call
 *   /api/db-debug?key=<DEBUG_KEY>
 * Without a matching key the route returns 404, so nothing is exposed publicly.
 * It reports only counts and the error message: no user emails, no stack traces.
 */
export async function GET(request: NextRequest) {
  const expected = process.env.DEBUG_KEY;
  const provided = request.nextUrl.searchParams.get("key");

  if (!expected || !provided || provided !== expected) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const started = Date.now();

  try {
    const payload = await getPayloadClient();
    const projects = await payload.find({
      collection: "projects" as never,
      limit: 100,
      depth: 0,
    });

    return NextResponse.json({
      success: true,
      elapsedMs: Date.now() - started,
      databaseUrlDefined: !!process.env.DATABASE_URL,
      payloadSecretDefined: !!process.env.PAYLOAD_SECRET,
      projectsCount: projects.totalDocs,
      projects: projects.docs.map((p) => {
        const doc = p as { id?: string | number; slug?: string; status?: string };
        return { id: doc.id, slug: doc.slug, status: doc.status };
      }),
    });
  } catch (e) {
    const err = e as { message?: string; code?: string; cause?: { code?: string } };
    console.error("[db-debug] Database query failed:", e);
    return NextResponse.json(
      {
        success: false,
        elapsedMs: Date.now() - started,
        databaseUrlDefined: !!process.env.DATABASE_URL,
        payloadSecretDefined: !!process.env.PAYLOAD_SECRET,
        error: err.message ?? "Unknown error",
        code: err.code ?? err.cause?.code ?? null,
      },
      { status: 500 },
    );
  }
}
