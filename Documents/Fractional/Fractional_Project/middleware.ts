import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://www.productclarity.work";
const CV_INFO_URL = `${BASE_URL}/CV/latest-cv-info.json`;
const DATED_CV_PATTERN = /^\/CV\/Coen-Horrevoets-\d{4}-\d{2}-\d{2}\.pdf$/;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!DATED_CV_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  return getLatestCvRedirect(request, pathname);
}

async function getLatestCvRedirect(
  request: NextRequest,
  requestedPath: string
): Promise<NextResponse> {
  try {
    const res = await fetch(CV_INFO_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.next();
    }
    const cvInfo = (await res.json()) as { url?: string; filename?: string };
    const latestPath = cvInfo.url?.startsWith("/") ? cvInfo.url : `/CV/${cvInfo.filename ?? "latest.pdf"}`;

    // If they're already on the latest, continue to static file
    if (requestedPath === latestPath) {
      return NextResponse.next();
    }

    // Redirect to the newest dated version
    const redirectUrl = new URL(latestPath, request.url);
    return NextResponse.redirect(redirectUrl, 302);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  // Run only on dated CV paths (e.g. /CV/Coen-Horrevoets-2026-01-28.pdf); DATED_CV_PATTERN filters inside
  matcher: ["/CV/:path*"],
};
