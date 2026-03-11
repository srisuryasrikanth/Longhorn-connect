import { describe, expect, it } from "vitest";

import { applyStarAward, DuplicateStarError, type StarGateway } from "../lib/services/stars";

describe("applyStarAward", () => {
  it("awards a star once and blocks the duplicate attempt", async () => {
    let starCount = 3;
    const seenClients = new Set<string>();

    const gateway: StarGateway = {
      async getAlumni() {
        return { starCount };
      },
      async createAndIncrement(_alumniId, clientId) {
        if (seenClients.has(clientId)) {
          throw new DuplicateStarError();
        }

        seenClients.add(clientId);
        starCount += 1;
        return starCount;
      },
      async getCurrentStarCount() {
        return starCount;
      }
    };

    const first = await applyStarAward(gateway, "alumni-1", "browser-1");
    const duplicate = await applyStarAward(gateway, "alumni-1", "browser-1");

    expect(first).toEqual({ status: "awarded", starCount: 4 });
    expect(duplicate).toEqual({ status: "duplicate", starCount: 4 });
  });

  it("returns not_found when the alumni record does not exist", async () => {
    const gateway: StarGateway = {
      async getAlumni() {
        return null;
      },
      async createAndIncrement() {
        throw new Error("Should not be called");
      },
      async getCurrentStarCount() {
        return 0;
      }
    };

    await expect(applyStarAward(gateway, "missing", "browser-1")).resolves.toEqual({ status: "not_found" });
  });
});

