import { NextResponse } from "next/server";

import { getLeaderboard } from "@/lib/services/alumni";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard(10);
    return NextResponse.json({ leaderboard });
  } catch {
    return NextResponse.json({ message: "Unable to load the leaderboard right now." }, { status: 500 });
  }
}

