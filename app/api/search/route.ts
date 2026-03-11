import { NextRequest, NextResponse } from "next/server";

import { getSearchResponse } from "@/lib/services/alumni";
import type { SearchFilters } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") ?? searchParams.get("query") ?? "";
    const filters: SearchFilters = {
      location: searchParams.get("location") ?? undefined,
      major: searchParams.get("major") ?? undefined,
      industry: searchParams.get("industry") ?? undefined,
      companyType: searchParams.get("companyType") ?? undefined
    };

    const results = await getSearchResponse(query, filters);
    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ message: "Unable to search alumni right now." }, { status: 500 });
  }
}

