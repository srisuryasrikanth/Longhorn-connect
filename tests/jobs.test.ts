import { describe, expect, it } from "vitest";

import { normalizeJobPostingInput, sortJobPostings } from "../lib/services/jobs";
import type { CreateJobPostingInput } from "../lib/types";

function makeInput(overrides: Partial<CreateJobPostingInput> = {}): CreateJobPostingInput {
  return {
    alumniId: "alumni-1",
    title: "Associate Product Manager",
    location: "Austin, TX",
    employmentType: "Full-time",
    workMode: "Hybrid",
    description: "Help shape student-friendly product experiments.",
    applyUrl: "https://example.com/jobs/apm",
    ...overrides
  };
}

describe("normalizeJobPostingInput", () => {
  it("trims required fields and drops a blank application URL", () => {
    const normalized = normalizeJobPostingInput(
      makeInput({
        alumniId: " alumni-1 ",
        title: " Associate Product Manager ",
        location: " Austin, TX ",
        description: " Help shape student-friendly product experiments. ",
        applyUrl: "   "
      })
    );

    expect(normalized).toEqual({
      alumniId: "alumni-1",
      title: "Associate Product Manager",
      location: "Austin, TX",
      employmentType: "Full-time",
      workMode: "Hybrid",
      description: "Help shape student-friendly product experiments.",
      applyUrl: undefined
    });
  });

  it("rejects unsupported work modes and invalid URLs", () => {
    expect(() => normalizeJobPostingInput(makeInput({ workMode: "Async" }))).toThrow("Please choose a supported work mode.");
    expect(() => normalizeJobPostingInput(makeInput({ applyUrl: "example.com/jobs/apm" }))).toThrow(
      "Application links must start with http:// or https://."
    );
  });
});

describe("sortJobPostings", () => {
  it("orders jobs from newest to oldest", () => {
    const jobs = sortJobPostings([
      { createdAt: "2026-03-01T10:00:00.000Z", title: "Older" },
      { createdAt: "2026-03-03T08:30:00.000Z", title: "Newest" },
      { createdAt: "2026-03-02T12:00:00.000Z", title: "Middle" }
    ]);

    expect(jobs.map((job) => job.title)).toEqual(["Newest", "Middle", "Older"]);
  });
});