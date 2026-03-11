import type { JobPosting } from "@/lib/types";

export const JOB_EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Internship", "Contract"] as const;
export const JOB_WORK_MODES = ["On-site", "Hybrid", "Remote"] as const;

export function buildJobBoardMailtoLink(job: Pick<JobPosting, "applyEmail" | "title" | "company">): string {
  const subject = `UT Austin student interested in the ${job.title} role at ${job.company}`;
  const body = [
    "Hi there,",
    "",
    `I found the ${job.title} opportunity on the UT Austin Alumni Connector job board.`,
    "I am a current UT Austin student and would love to learn more about the role and the team.",
    "",
    "Thank you,",
    "A UT Austin student"
  ].join("\n");

  return `mailto:${job.applyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}