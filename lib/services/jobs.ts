import type { Alumni, JobPosting as PrismaJobPosting } from "@prisma/client";

import { JOB_EMPLOYMENT_TYPES, JOB_WORK_MODES } from "@/lib/jobs";
import { prisma } from "@/lib/prisma";
import type { CreateJobPostingInput, JobBoardAlumniOption, JobBoardResponse, JobPosting } from "@/lib/types";

export class JobValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobValidationError";
  }
}

type JobPostingRecord = PrismaJobPosting & {
  alumni: Pick<Alumni, "id" | "slug" | "fullName" | "currentJobTitle" | "email">;
};

function toJobPosting(record: JobPostingRecord): JobPosting {
  return {
    id: record.id,
    alumniId: record.alumniId,
    title: record.title,
    company: record.company,
    location: record.location,
    employmentType: record.employmentType,
    workMode: record.workMode,
    description: record.description,
    applyUrl: record.applyUrl ?? undefined,
    applyEmail: record.applyEmail,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    alumni: {
      id: record.alumni.id,
      slug: record.alumni.slug,
      fullName: record.alumni.fullName,
      currentJobTitle: record.alumni.currentJobTitle,
      email: record.alumni.email
    }
  };
}

function normalizeOptionalUrl(value?: string): string | undefined {
  const nextValue = value?.trim();
  return nextValue ? nextValue : undefined;
}

export function normalizeJobPostingInput(input: CreateJobPostingInput): CreateJobPostingInput {
  const normalized: CreateJobPostingInput = {
    alumniId: input.alumniId.trim(),
    title: input.title.trim(),
    location: input.location.trim(),
    employmentType: input.employmentType.trim(),
    workMode: input.workMode.trim(),
    description: input.description.trim(),
    applyUrl: normalizeOptionalUrl(input.applyUrl)
  };

  if (!normalized.alumniId || !normalized.title || !normalized.location || !normalized.employmentType || !normalized.workMode || !normalized.description) {
    throw new JobValidationError("All required job fields must be filled out.");
  }

  if (!JOB_EMPLOYMENT_TYPES.includes(normalized.employmentType as (typeof JOB_EMPLOYMENT_TYPES)[number])) {
    throw new JobValidationError("Please choose a supported employment type.");
  }

  if (!JOB_WORK_MODES.includes(normalized.workMode as (typeof JOB_WORK_MODES)[number])) {
    throw new JobValidationError("Please choose a supported work mode.");
  }

  if (normalized.applyUrl && !/^https?:\/\//i.test(normalized.applyUrl)) {
    throw new JobValidationError("Application links must start with http:// or https://.");
  }

  return normalized;
}

export function sortJobPostings<T extends Pick<JobPosting, "createdAt">>(jobs: T[]): T[] {
  return [...jobs].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const records = await prisma.jobPosting.findMany({
    include: {
      alumni: {
        select: {
          id: true,
          slug: true,
          fullName: true,
          currentJobTitle: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return records.map(toJobPosting);
}

export async function getJobBoardAlumniOptions(): Promise<JobBoardAlumniOption[]> {
  return prisma.alumni.findMany({
    select: {
      id: true,
      slug: true,
      fullName: true,
      company: true,
      currentJobTitle: true,
      email: true
    },
    orderBy: {
      fullName: "asc"
    }
  });
}

export async function getJobBoardData(): Promise<JobBoardResponse> {
  const [jobs, alumniOptions] = await Promise.all([getJobPostings(), getJobBoardAlumniOptions()]);

  return {
    jobs,
    alumniOptions
  };
}

export async function createJobPosting(input: CreateJobPostingInput): Promise<JobPosting> {
  const normalized = normalizeJobPostingInput(input);

  const alumni = await prisma.alumni.findUnique({
    where: {
      id: normalized.alumniId
    },
    select: {
      id: true,
      slug: true,
      fullName: true,
      currentJobTitle: true,
      company: true,
      email: true
    }
  });

  if (!alumni) {
    throw new JobValidationError("Selected alumni profile was not found.");
  }

  const record = await prisma.jobPosting.create({
    data: {
      alumniId: alumni.id,
      title: normalized.title,
      company: alumni.company,
      location: normalized.location,
      employmentType: normalized.employmentType,
      workMode: normalized.workMode,
      description: normalized.description,
      applyUrl: normalized.applyUrl,
      applyEmail: alumni.email
    },
    include: {
      alumni: {
        select: {
          id: true,
          slug: true,
          fullName: true,
          currentJobTitle: true,
          email: true
        }
      }
    }
  });

  return toJobPosting(record);
}