import type {
  AlumniProfile,
  AlumniSearchResult,
  SearchApiResponse,
  SearchBreakdown,
  SearchFilters
} from "@/lib/types";
import { normalizeText, roundScore } from "@/lib/utils";

const STOP_WORDS = new Set([
  "a",
  "an",
  "alumni",
  "and",
  "at",
  "companies",
  "company",
  "for",
  "in",
  "into",
  "of",
  "people",
  "student",
  "students",
  "studied",
  "the",
  "their",
  "to",
  "who",
  "with",
  "working",
  "work"
]);

const TOKEN_ALIASES: Record<string, string[]> = {
  software: ["software", "engineer", "engineering", "developer"],
  engineer: ["engineer", "engineering", "developer"],
  engineers: ["engineer", "engineering", "developer"],
  cs: ["computer science", "software", "developer"],
  product: ["product", "pm", "manager"],
  pm: ["product", "product manager"],
  startup: ["startup", "founder", "early stage"],
  startups: ["startup", "founder", "early stage"],
  biotech: ["biotech", "life science"],
  big: ["big"],
  tech: ["tech", "technology", "software"],
  data: ["data", "analytics", "analyst"],
  ml: ["machine learning", "ai"],
  ai: ["ai", "machine learning"],
  ux: ["ux", "user experience", "research"],
  ee: ["electrical engineering"],
  me: ["mechanical engineering"],
  finance: ["finance", "financial"],
  marketing: ["marketing", "growth", "brand"],
  nonprofit: ["nonprofit", "mission driven", "social impact"],
  mission: ["mission driven", "social impact", "nonprofit"],
  driven: ["mission driven"],
  policy: ["policy", "government", "public"],
  health: ["health", "healthcare", "public health"],
  dc: ["washington dc"]
};

const SPECIAL_PHRASES = [
  "big tech",
  "new york",
  "san francisco",
  "los angeles",
  "computer science",
  "machine learning",
  "public health",
  "developer relations",
  "product manager",
  "software engineer",
  "mission driven",
  "washington dc"
];

const FIELD_LABELS: Record<Exclude<keyof SearchBreakdown, "matchedTerms" | "total" | "starSignal">, string> = {
  jobTitle: "job title",
  company: "company",
  location: "location",
  education: "UT background",
  helpTopics: "bio and help topics"
};

const FILTER_FIELD_MAP: Record<keyof SearchFilters, keyof AlumniProfile> = {
  location: "location",
  major: "major",
  industry: "industry",
  companyType: "companyType"
};

function normalizeFilters(filters: SearchFilters): SearchFilters {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => typeof value === "string" && value.trim().length > 0)
  ) as SearchFilters;
}

function tokenize(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter((token) => token && !STOP_WORDS.has(token));
}

function collectPhrases(query: string): string[] {
  const normalized = normalizeText(query);
  const words = normalized.split(" ").filter(Boolean);
  const phrases = new Set<string>();

  for (let index = 0; index < words.length - 1; index += 1) {
    const bigram = `${words[index]} ${words[index + 1]}`;
    if (!STOP_WORDS.has(words[index]) || !STOP_WORDS.has(words[index + 1])) {
      phrases.add(bigram);
    }
  }

  for (const phrase of SPECIAL_PHRASES) {
    if (normalized.includes(phrase)) {
      phrases.add(phrase);
    }
  }

  return [...phrases];
}

function expandToken(token: string): string[] {
  const aliases = TOKEN_ALIASES[token] ?? [];
  return [...new Set([token, ...aliases])];
}

function scoreField(fieldText: string, query: string, tokens: string[], phrases: string[], weight: number) {
  const normalizedField = normalizeText(fieldText);
  let score = 0;
  const matches = new Set<string>();

  for (const phrase of phrases) {
    if (phrase.includes(" ") && normalizedField.includes(phrase)) {
      score += weight * 2.8;
      matches.add(phrase);
    }
  }

  for (const token of tokens) {
    const variants = expandToken(token);
    const matchedVariant = variants.find((variant) => normalizedField.includes(variant));

    if (matchedVariant) {
      score += weight * (matchedVariant === token ? 3.4 : 2.5);
      matches.add(token);
    }
  }

  if (query && normalizedField.includes(normalizeText(query))) {
    score += weight * 3.2;
  }

  return {
    score,
    matches
  };
}

function matchesFilters(profile: AlumniProfile, filters: SearchFilters): boolean {
  return (Object.entries(filters) as Array<[keyof SearchFilters, string | undefined]>).every(([key, value]) => {
    if (!value) {
      return true;
    }

    return profile[FILTER_FIELD_MAP[key]] === value;
  });
}

function summarizeBreakdown(breakdown: SearchBreakdown, hasQuery: boolean, hasFilters: boolean): string[] {
  if (!hasQuery && !hasFilters) {
    return ["Featured by star count"];
  }

  if (!hasQuery && hasFilters) {
    return ["Filtered match", "Sorted by star count"];
  }

  const signals = (Object.entries(FIELD_LABELS) as Array<
    [Exclude<keyof SearchBreakdown, "matchedTerms" | "total" | "starSignal">, string]
  >)
    .map(([key, label]) => ({ label, value: breakdown[key] }))
    .filter((entry) => entry.value > 0)
    .sort((left, right) => right.value - left.value)
    .slice(0, 3)
    .map((entry) => `${entry.label} signal`);

  if (breakdown.starSignal > 0) {
    signals.push("stars as a tie-breaker");
  }

  return signals;
}

function buildBreakdown(profile: AlumniProfile, query: string): SearchBreakdown {
  const normalizedQuery = normalizeText(query);
  const tokens = tokenize(query);
  const phrases = collectPhrases(query);
  const startupIntent = normalizedQuery.includes("startup");
  const bigTechIntent = normalizedQuery.includes("big tech") || (normalizedQuery.includes("big") && normalizedQuery.includes("tech"));
  const nonprofitIntent = normalizedQuery.includes("nonprofit") || normalizedQuery.includes("social impact") || normalizedQuery.includes("mission driven");

  const jobTitle = scoreField(`${profile.currentJobTitle} ${profile.industry}`, query, tokens, phrases, 5.4);
  const company = scoreField(`${profile.company} ${profile.companyType} ${profile.industry}`, query, tokens, phrases, 4.8);
  const location = scoreField(profile.location, query, tokens, phrases, 4.3);
  const education = scoreField(
    `${profile.degree} ${profile.major} university of texas ut austin longhorn`,
    query,
    tokens,
    phrases,
    4.6
  );
  const helpTopics = scoreField(`${profile.bio} ${profile.helpTopics}`, query, tokens, phrases, 3.5);

  if (startupIntent && normalizeText(profile.companyType).includes("startup")) {
    company.score += 10;
    company.matches.add("startup");
  }

  if (bigTechIntent && normalizeText(profile.companyType).includes("big tech")) {
    company.score += 10;
    company.matches.add("big tech");
  }

  if (nonprofitIntent && normalizeText(profile.companyType).includes("nonprofit")) {
    company.score += 9;
    company.matches.add("nonprofit");
  }

  const starSignal = roundScore(profile.starCount * 0.35);
  const total = roundScore(jobTitle.score + company.score + location.score + education.score + helpTopics.score + starSignal);
  const matchedTerms = [...new Set([...jobTitle.matches, ...company.matches, ...location.matches, ...education.matches, ...helpTopics.matches])];

  return {
    jobTitle: roundScore(jobTitle.score),
    company: roundScore(company.score),
    location: roundScore(location.score),
    education: roundScore(education.score),
    helpTopics: roundScore(helpTopics.score),
    starSignal,
    total,
    matchedTerms
  };
}

export function rankAlumniResults(
  profiles: AlumniProfile[],
  query: string,
  filters: SearchFilters = {}
): AlumniSearchResult[] {
  const normalizedFilters = normalizeFilters(filters);
  const hasFilters = Object.keys(normalizedFilters).length > 0;
  const hasQuery = tokenize(query).length > 0 || collectPhrases(query).length > 0;

  return profiles
    .filter((profile) => matchesFilters(profile, normalizedFilters))
    .map((profile) => {
      const breakdown = buildBreakdown(profile, query);
      return {
        alumni: profile,
        rank: 0,
        score: breakdown.total,
        breakdown,
        summary: summarizeBreakdown(breakdown, hasQuery, hasFilters)
      } satisfies AlumniSearchResult;
    })
    .filter((result) => !hasQuery || result.breakdown.total - result.breakdown.starSignal > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.alumni.starCount !== left.alumni.starCount) {
        return right.alumni.starCount - left.alumni.starCount;
      }

      return left.alumni.fullName.localeCompare(right.alumni.fullName);
    })
    .map((result, index) => ({
      ...result,
      rank: index + 1
    }));
}

export function buildSearchResponse(
  profiles: AlumniProfile[],
  query: string,
  filters: SearchFilters = {}
): SearchApiResponse {
  return {
    mode: "local-weighted",
    query,
    filters: normalizeFilters(filters),
    results: rankAlumniResults(profiles, query, filters),
    totalProfiles: profiles.length
  };
}

