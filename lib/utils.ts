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
  const degree = alumni.degree.trim();
  const major = alumni.major.trim();

  if (degree && major && alumni.graduationYear > 0) {
    return `${degree} in ${major}, ${alumni.graduationYear}`;
  }

  if (degree && major) {
    return `${degree} in ${major}`;
  }

  if (major) {
    return major;
  }

  return degree || "Background not available";
}

export function getFirstName(fullName: string): string {
  return fullName.split(" ")[0] ?? fullName;
}

export function buildMailtoLink(
  alumni: Pick<AlumniProfile, "email" | "fullName" | "currentJobTitle" | "company" | "major">
): string {
  const firstName = getFirstName(alumni.fullName);
  const focus = alumni.major.trim() || "your field";
  const subject = `UT Austin student reaching out about your path at ${alumni.company}`;
  const body = [
    `Hi ${firstName},`,
    "",
    "I am a current UT Austin student and found your profile in the Alumni Connector.",
    `I would love to learn more about your path into ${alumni.currentJobTitle} and any advice you have for students interested in ${focus}.`,
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

