import type { AlumniProfile } from "@/lib/types";

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitCommaList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatEducation(alumni: Pick<AlumniProfile, "degree" | "major" | "graduationYear">): string {
  return `${alumni.degree} in ${alumni.major}, ${alumni.graduationYear}`;
}

export function getFirstName(fullName: string): string {
  return fullName.split(" ")[0] ?? fullName;
}

export function buildMailtoLink(
  alumni: Pick<AlumniProfile, "email" | "fullName" | "currentJobTitle" | "company" | "major">
): string {
  const firstName = getFirstName(alumni.fullName);
  const subject = `UT Austin student reaching out about your path at ${alumni.company}`;
  const body = [
    `Hi ${firstName},`,
    "",
    "I am a current UT Austin student and found your profile in the Alumni Connector.",
    `I would love to learn more about your path into ${alumni.currentJobTitle} and any advice you have for students interested in ${alumni.major}.`,
    "",
    "If you have time for a quick chat, I would really appreciate it.",
    "",
    "Thank you,",
    "A UT Austin student"
  ].join("\n");

  return `mailto:${alumni.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

export function sortAlphabetically(values: Iterable<string>): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

