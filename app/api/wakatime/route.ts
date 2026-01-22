import { NextResponse } from "next/server";

export async function GET() {
  console.log(process.env.WAKATIME_API_KEY)
  const res = await fetch(
    "https://wakatime.com/api/v1/users/current/summaries?range=last_2_days",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY + ":").toString("base64")}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
