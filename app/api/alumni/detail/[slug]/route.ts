import { NextResponse } from "next/server";

import { getAlumniDetailBySlug } from "@/lib/services/alumni";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;

  try {
    const alumni = await getAlumniDetailBySlug(slug);

    if (!alumni) {
      return NextResponse.json({ message: "Alumni profile not found." }, { status: 404 });
    }

    return NextResponse.json(alumni);
  } catch {
    return NextResponse.json({ message: "Unable to load the alumni profile right now." }, { status: 500 });
  }
}

