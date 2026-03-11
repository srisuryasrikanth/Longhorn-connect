import type { Alumni as PrismaAlumni } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { AlumniProfile, FilterOptions, LeaderboardEntry, SearchApiResponse, SearchFilters } from "@/lib/types";
import { sortAlphabetically } from "@/lib/utils";
import { buildLeaderboard } from "@/lib/services/leaderboard";
import { buildSearchResponse } from "@/lib/services/search";

function toAlumniProfile(record: PrismaAlumni): AlumniProfile {
  return {
    id: record.id,
    slug: record.slug,
    fullName: record.fullName,
    currentJobTitle: record.currentJobTitle,
    company: record.company,
    companyType: record.companyType,
    industry: record.industry,
    location: record.location,
    degree: record.degree,
    major: record.major,
    graduationYear: record.graduationYear,
    email: record.email,
    bio: record.bio,
    helpTopics: record.helpTopics,
    starCount: record.starCount
  };
}

export async function getAllAlumniProfiles(): Promise<AlumniProfile[]> {
  const records = await prisma.alumni.findMany({
    orderBy: {
      fullName: "asc"
    }
  });

  return records.map(toAlumniProfile);
}

export async function getAlumniDetailBySlug(slug: string): Promise<AlumniProfile | null> {
  const record = await prisma.alumni.findUnique({
    where: { slug }
  });

  return record ? toAlumniProfile(record) : null;
}

export async function getFilterOptions(): Promise<FilterOptions> {
  const alumni = await getAllAlumniProfiles();

  return {
    locations: sortAlphabetically(new Set(alumni.map((profile) => profile.location))),
    majors: sortAlphabetically(new Set(alumni.map((profile) => profile.major))),
    industries: sortAlphabetically(new Set(alumni.map((profile) => profile.industry))),
    companyTypes: sortAlphabetically(new Set(alumni.map((profile) => profile.companyType)))
  };
}

export async function getSearchResponse(query = "", filters: SearchFilters = {}): Promise<SearchApiResponse> {
  const alumni = await getAllAlumniProfiles();
  return buildSearchResponse(alumni, query, filters);
}

export async function getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const alumni = await getAllAlumniProfiles();
  return buildLeaderboard(alumni, limit);
}

export async function getHomePageData(): Promise<{
  initialSearch: SearchApiResponse;
  filterOptions: FilterOptions;
  leaderboard: LeaderboardEntry[];
}> {
  const alumni = await getAllAlumniProfiles();

  return {
    initialSearch: buildSearchResponse(alumni, ""),
    filterOptions: {
      locations: sortAlphabetically(new Set(alumni.map((profile) => profile.location))),
      majors: sortAlphabetically(new Set(alumni.map((profile) => profile.major))),
      industries: sortAlphabetically(new Set(alumni.map((profile) => profile.industry))),
      companyTypes: sortAlphabetically(new Set(alumni.map((profile) => profile.companyType)))
    },
    leaderboard: buildLeaderboard(alumni, 10)
  };
}

