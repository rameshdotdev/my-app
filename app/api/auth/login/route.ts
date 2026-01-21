// app/api/auth/login/route.ts  (App Router)
import { API_URL } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const backendRes = await fetch(API_URL + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // Important: forward cookies if needed
    credentials: "include",
  });

  const data = await backendRes.json();

  // Forward Set-Cookie headers from backend → browser
  const setCookieHeaders = backendRes.headers.getSetCookie?.() || [];

  const response = NextResponse.json(data);

  setCookieHeaders.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}
