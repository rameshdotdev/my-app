import { NextResponse } from "next/server";

const API_BASE = "https://github-contributions-api.jogruber.de/v4";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/rameshdotdev`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 500 },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching contributions" },
      { status: 500 },
    );
  }
}
