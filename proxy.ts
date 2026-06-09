import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = (req: NextRequest) => {
  const token = req.cookies.get("auth_token");

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
