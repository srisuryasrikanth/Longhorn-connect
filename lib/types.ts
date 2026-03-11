export type AlumniProfile = {
  id: string;
  slug: string;
  fullName: string;
  currentJobTitle: string;
  company: string;
  companyType: string;
  industry: string;
  location: string;
  degree: string;
  major: string;
  graduationYear: number;
  email: string;
  bio: string;
  helpTopics: string;
  starCount: number;
};

export type SeedAlumniProfile = Omit<AlumniProfile, "id">;

export type JobPosting = {
  id: string;
  alumniId: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  workMode: string;
  description: string;
  applyUrl?: string;
  applyEmail: string;
  createdAt: string;
  updatedAt: string;
  alumni: Pick<AlumniProfile, "id" | "slug" | "fullName" | "currentJobTitle" | "email">;
};

export type SeedJobPosting = {
  alumniSlug: string;
  title: string;
  location: string;
  employmentType: string;
  workMode: string;
  description: string;
  applyUrl?: string;
};

export type JobBoardAlumniOption = Pick<AlumniProfile, "id" | "slug" | "fullName" | "company" | "currentJobTitle" | "email">;

export type CreateJobPostingInput = {
  alumniId: string;
  title: string;
  location: string;
  employmentType: string;
  workMode: string;
  description: string;
  applyUrl?: string;
};

export type JobBoardResponse = {
  jobs: JobPosting[];
  alumniOptions: JobBoardAlumniOption[];
};

export type JobPostingsApiResponse = {
  jobs: JobPosting[];
};

export type CreateJobPostingApiResponse =
  | {
      status: "created";
      job: JobPosting;
    }
  | {
      status: "validation_error";
      message: string;
    };

export type SearchFilters = {
  location?: string;
  major?: string;
  industry?: string;
  companyType?: string;
};

export type SearchBreakdown = {
  jobTitle: number;
  company: number;
  location: number;
  education: number;
  helpTopics: number;
  starSignal: number;
  total: number;
  matchedTerms: string[];
};

export type AlumniSearchResult = {
  alumni: AlumniProfile;
  rank: number;
  score: number;
  breakdown: SearchBreakdown;
  summary: string[];
};

export type SearchApiResponse = {
  mode: "local-weighted";
  query: string;
  filters: SearchFilters;
  results: AlumniSearchResult[];
  totalProfiles: number;
};

export type LeaderboardEntry = Pick<
  AlumniProfile,
  "id" | "slug" | "fullName" | "currentJobTitle" | "company" | "location" | "starCount"
>;

export type FilterOptions = {
  locations: string[];
  majors: string[];
  industries: string[];
  companyTypes: string[];
};

export type StarAwardResult =
  | { status: "awarded"; starCount: number }
  | { status: "duplicate"; starCount: number }
  | { status: "not_found" };