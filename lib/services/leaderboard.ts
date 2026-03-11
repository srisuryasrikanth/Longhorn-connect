import type { AlumniProfile, LeaderboardEntry } from "@/lib/types";

export function sortLeaderboard<T extends Pick<AlumniProfile, "fullName" | "starCount">>(profiles: T[]): T[] {
  return [...profiles].sort((left, right) => {
    if (right.starCount !== left.starCount) {
      return right.starCount - left.starCount;
    }

    return left.fullName.localeCompare(right.fullName);
  });
}

export function buildLeaderboard(profiles: AlumniProfile[], limit = 10): LeaderboardEntry[] {
  return sortLeaderboard(profiles)
    .slice(0, limit)
    .map((profile) => ({
      id: profile.id,
      slug: profile.slug,
      fullName: profile.fullName,
      currentJobTitle: profile.currentJobTitle,
      company: profile.company,
      location: profile.location,
      starCount: profile.starCount
    }));
}

