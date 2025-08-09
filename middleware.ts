import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  // Handle jobapplication subdomain (both localhost and production)
  if (
    hostname.startsWith("jobapplication.") ||
    hostname === "jobapplication.localhost:3000"
  ) {
    // Rewrite to the job application page
    console.log("rewriting to job application page")

    return NextResponse.rewrite(new URL("/job-application", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
