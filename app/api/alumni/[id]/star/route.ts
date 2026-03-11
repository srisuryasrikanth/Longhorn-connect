import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { awardStar } from "@/lib/services/stars";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const body = (await request.json()) as { clientId?: string };
    const clientId = body.clientId?.trim();

    if (!clientId) {
      return NextResponse.json({ message: "clientId is required." }, { status: 400 });
    }

    const result = await awardStar(id, clientId);

    if (result.status === "not_found") {
      return NextResponse.json({ message: "Alumni profile not found." }, { status: 404 });
    }

    if (result.status === "awarded") {
      revalidatePath("/");
      revalidatePath("/leaderboard");
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: "Unable to award a star right now." }, { status: 500 });
  }
}

