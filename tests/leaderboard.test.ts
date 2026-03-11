import { describe, expect, it } from "vitest";

import { sortLeaderboard } from "../lib/services/leaderboard";

describe("sortLeaderboard", () => {
  it("orders alumni by star count descending and then by name", () => {
    const leaderboard = sortLeaderboard([
      { fullName: "Jordan Ramirez", starCount: 21 },
      { fullName: "Avery Patel", starCount: 23 },
      { fullName: "Alex Thompson", starCount: 20 },
      { fullName: "Bailey Evans", starCount: 20 }
    ]);

    expect(leaderboard.map((entry) => entry.fullName)).toEqual([
      "Avery Patel",
      "Jordan Ramirez",
      "Alex Thompson",
      "Bailey Evans"
    ]);
  });
});

