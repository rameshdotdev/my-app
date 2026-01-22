import { NextResponse } from "next/server";

function toBasicAuth(apiKey: string) {
  return `Basic ${Buffer.from(apiKey + ":").toString("base64")}`;
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing WAKATIME_API_KEY in env" },
      { status: 500 }
    );
  }

  const res = await fetch(
    "https://wakatime.com/api/v1/users/current/summaries?range=last_7_days",
    {
      headers: { Authorization: toBasicAuth(apiKey) },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "WakaTime request failed", details: err },
      { status: 500 }
    );
  }

  const data = await res.json();

  const days = data?.data ?? [];
  const yesterday = days[days.length - 2]; // yesterday
  const editors = yesterday?.editors ?? [];

  // Only pick Cursor + VS Code
  const wanted = new Set(["Cursor", "VS Code"]);
  const filteredEditors = editors.filter((e: any) => wanted.has(e.name));

  const combinedSeconds = filteredEditors.reduce(
    (sum: number, e: any) => sum + (e.total_seconds ?? 0),
    0
  );

  const combinedText =
    combinedSeconds >= 3600
      ? `${Math.floor(combinedSeconds / 3600)}h ${Math.floor(
          (combinedSeconds % 3600) / 60
        )}m`
      : `${Math.floor(combinedSeconds / 60)}m`;

  return NextResponse.json({
    date: yesterday?.range?.date ?? null,
    combined: {
      total_seconds: combinedSeconds,
      text: combinedText,
    },
    editors: filteredEditors.map((e: any) => ({
      name: e.name,
      text: e.text,
      total_seconds: e.total_seconds,
    })),
  });
}
