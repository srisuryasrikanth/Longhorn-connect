import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createJobPosting, getJobPostings, JobValidationError } from "@/lib/services/jobs";
import type { CreateJobPostingApiResponse, CreateJobPostingInput, JobPostingsApiResponse } from "@/lib/types";

export async function GET() {
  try {
    const jobs = await getJobPostings();
    const response: JobPostingsApiResponse = { jobs };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ message: "Unable to load job postings right now." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateJobPostingInput>;
    const job = await createJobPosting({
      alumniId: body.alumniId ?? "",
      title: body.title ?? "",
      location: body.location ?? "",
      employmentType: body.employmentType ?? "",
      workMode: body.workMode ?? "",
      description: body.description ?? "",
      applyUrl: body.applyUrl ?? ""
    });

    revalidatePath("/jobs");

    const response: CreateJobPostingApiResponse = {
      status: "created",
      job
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof JobValidationError) {
      const response: CreateJobPostingApiResponse = {
        status: "validation_error",
        message: error.message
      };

      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json({ message: "Unable to post a job right now." }, { status: 500 });
  }
}