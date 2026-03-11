import { describe, expect, it } from "vitest";

import { seedAlumniProfiles } from "../lib/data/alumni-seed";
import { rankAlumniResults } from "../lib/services/search";
import type { AlumniProfile } from "../lib/types";

function withIds(...slugs: string[]): AlumniProfile[] {
  return slugs.map((slug, index) => {
    const profile = seedAlumniProfiles.find((entry) => entry.slug === slug);

    if (!profile) {
      throw new Error(`Missing seed profile for ${slug}`);
    }

    return {
      id: `${index + 1}`,
      ...profile
    };
  });
}

describe("rankAlumniResults", () => {
  it("prioritizes Seattle software alumni with UT CS backgrounds", () => {
    const profiles = withIds("avery-patel", "devon-clark", "logan-bennett", "jordan-ramirez");

    const results = rankAlumniResults(profiles, "software engineers in Seattle who studied CS");
    const topThree = results.slice(0, 3).map((result) => result.alumni.slug);

    expect(results[0]?.alumni.slug).toBe("avery-patel");
    expect(topThree).toEqual(expect.arrayContaining(["devon-clark", "logan-bennett"]));
    expect(results.every((result) => result.breakdown.location >= 0)).toBe(true);
  });

  it("boosts startup product alumni in Austin", () => {
    const profiles = withIds("jordan-ramirez", "harper-brooks", "reese-martinez", "cameron-lee");

    const results = rankAlumniResults(profiles, "people in product at startups in Austin");

    expect(results[0]?.alumni.slug).toBe("jordan-ramirez");
    expect(results[1]?.alumni.slug).toBe("harper-brooks");
    expect(results[0]?.score).toBeGreaterThan(results[2]?.score ?? 0);
  });
});

