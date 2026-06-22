import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept access to /admin and all subpaths EXCEPT:
  // - /admin/api or /api (Payload internal APIs)
  // - /admin/assets (static assets for Payload)
  if (
    pathname === "/admin" ||
    (pathname.startsWith("/admin/") &&
      !pathname.startsWith("/admin/api") &&
      !pathname.startsWith("/admin/assets"))
  ) {
    return NextResponse.redirect(new URL("/manage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
