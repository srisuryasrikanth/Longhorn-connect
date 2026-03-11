"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";

import { buildJobBoardMailtoLink, JOB_EMPLOYMENT_TYPES, JOB_WORK_MODES } from "@/lib/jobs";
import type {
  CreateJobPostingApiResponse,
  CreateJobPostingInput,
  JobBoardAlumniOption,
  JobBoardResponse,
  JobPosting
} from "@/lib/types";

type JobBoardClientProps = JobBoardResponse;

type JobFormState = CreateJobPostingInput & {
  applyUrl: string;
};

function createInitialFormState(alumniOptions: JobBoardAlumniOption[]): JobFormState {
  return {
    alumniId: alumniOptions[0]?.id ?? "",
    title: "",
    location: "",
    employmentType: JOB_EMPLOYMENT_TYPES[0],
    workMode: JOB_WORK_MODES[0],
    description: "",
    applyUrl: ""
  };
}

function formatPostedDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export default function JobBoardClient({ jobs: initialJobs, alumniOptions }: JobBoardClientProps) {
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [formState, setFormState] = useState<JobFormState>(() => createInitialFormState(alumniOptions));
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedAlumni = alumniOptions.find((option) => option.id === formState.alumniId) ?? null;
  const companiesHiring = new Set(jobs.map((job) => job.company)).size;

  function updateField<Key extends keyof JobFormState>(key: Key, value: JobFormState[Key]) {
    setFormState((current) => ({
      ...current,
      [key]: value
    }));
  }

  function resetForm(keepAlumniId: string) {
    setFormState({
      ...createInitialFormState(alumniOptions),
      alumniId: keepAlumniId || alumniOptions[0]?.id || ""
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formState)
        });

        const payload = (await response.json()) as CreateJobPostingApiResponse | { message?: string };

        if (!response.ok) {
          if ("status" in payload && payload.status === "validation_error") {
            throw new Error(payload.message);
          }

          throw new Error("message" in payload && payload.message ? payload.message : "Unable to post the job right now.");
        }

        if (!("status" in payload) || payload.status !== "created") {
          throw new Error("Unable to post the job right now.");
        }

        setJobs((current) => [payload.job, ...current]);
        resetForm(formState.alumniId);
        setSuccessMessage(`Posted ${payload.job.title} at ${payload.job.company}.`);
      } catch (submissionError) {
        setError(submissionError instanceof Error ? submissionError.message : "Unable to post the job right now.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 px-6 py-8 shadow-panel backdrop-blur md:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burnt/70">Job Board</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-slate md:text-5xl">
              Alumni-posted roles for students who want a warm start.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate/75 md:text-lg">
              Browse fictional openings shared by UT Austin alumni and add new roles through a lightweight MVP form. For now, posting is tied to a selected alumni profile instead of authentication.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-burnt/10 bg-cream p-4">
              <p className="text-sm font-semibold text-slate">Open roles</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-slate">{jobs.length}</p>
            </div>
            <div className="rounded-[1.75rem] border border-burnt/10 bg-cream p-4">
              <p className="text-sm font-semibold text-slate">Companies hiring</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-slate">{companiesHiring}</p>
            </div>
            <div className="rounded-[1.75rem] border border-burnt/10 bg-cream p-4">
              <p className="text-sm font-semibold text-slate">Posting flow</p>
              <p className="mt-2 text-sm leading-7 text-slate/75">Choose an alumni profile, add role details, and publish instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Post a job</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-slate">Alumni posting form</h2>
            </div>
            <span className="rounded-full bg-burnt/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-burnt">MVP</span>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate/75">
            No authentication yet. To keep the flow simple, a job post is published under the alumni profile you select below.
          </p>

          {error ? <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
          {successMessage ? <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div> : null}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Posting alumni</span>
              <select
                value={formState.alumniId}
                onChange={(event) => updateField("alumniId", event.target.value)}
                className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none"
                disabled={alumniOptions.length === 0}
              >
                {alumniOptions.length === 0 ? <option value="">No alumni available</option> : null}
                {alumniOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.fullName} - {option.company}
                  </option>
                ))}
              </select>
            </label>

            {selectedAlumni ? (
              <div className="rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate/75">
                <p className="font-semibold text-slate">Posting as {selectedAlumni.fullName}</p>
                <p className="mt-1">{selectedAlumni.currentJobTitle} at {selectedAlumni.company}</p>
                <p className="mt-1">Applications default to {selectedAlumni.email}</p>
              </div>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Job title</span>
              <input
                value={formState.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Associate Product Manager"
                className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none transition focus:border-burnt/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Location</span>
              <input
                value={formState.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Austin, TX"
                className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none transition focus:border-burnt/40"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate">Employment type</span>
                <select
                  value={formState.employmentType}
                  onChange={(event) => updateField("employmentType", event.target.value)}
                  className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none"
                >
                  {JOB_EMPLOYMENT_TYPES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate">Work mode</span>
                <select
                  value={formState.workMode}
                  onChange={(event) => updateField("workMode", event.target.value)}
                  className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none"
                >
                  {JOB_WORK_MODES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Description</span>
              <textarea
                value={formState.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={5}
                placeholder="Share what the role works on, who it is a fit for, and what students should know before reaching out."
                className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none transition focus:border-burnt/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Optional application URL</span>
              <input
                value={formState.applyUrl}
                onChange={(event) => updateField("applyUrl", event.target.value)}
                placeholder="https://example.com/jobs/associate-product-manager"
                className="w-full rounded-2xl border border-slate/10 bg-cream px-4 py-3 text-sm text-slate outline-none transition focus:border-burnt/40"
              />
            </label>

            <button
              type="submit"
              disabled={isPending || alumniOptions.length === 0}
              className="w-full rounded-full bg-burnt px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:bg-burnt/60"
            >
              {isPending ? "Posting job..." : "Publish job"}
            </button>
          </form>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Latest roles</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-slate">Newest alumni opportunities</h2>
              <p className="mt-2 text-sm text-slate/70">Sorted newest first so students can quickly find fresh openings and warm intros.</p>
            </div>
            <div className="rounded-full border border-slate/10 bg-white px-4 py-2 text-sm text-slate/70">{jobs.length} total listings</div>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate/20 bg-white/80 px-6 py-10 text-center shadow-panel">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-slate">No jobs have been posted yet.</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">Use the alumni posting form to publish the first opportunity for students.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const contactHref = job.applyUrl ?? buildJobBoardMailtoLink(job);
                const contactLabel = job.applyUrl ? "View application" : "Message alumni";

                return (
                  <article key={job.id} className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate/65">
                            <span className="rounded-full bg-burnt/10 px-3 py-1 font-semibold text-burnt">{job.employmentType}</span>
                            <span>{job.workMode}</span>
                            <span>{job.location}</span>
                            <span>Posted {formatPostedDate(job.createdAt)}</span>
                          </div>
                          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-slate">{job.title}</h3>
                          <p className="mt-2 text-lg font-semibold text-slate/90">{job.company}</p>
                        </div>

                        <p className="max-w-3xl text-sm leading-7 text-slate/80">{job.description}</p>

                        <div className="flex flex-wrap gap-3 text-sm text-slate/75">
                          <span className="rounded-full border border-slate/10 bg-slate/5 px-3 py-1">Contact: {job.applyEmail}</span>
                          <Link
                            href={`/alumni/${job.alumni.slug}`}
                            className="rounded-full border border-burnt/15 bg-burnt/5 px-3 py-1 text-burnt transition hover:border-burnt/35"
                          >
                            Posted by {job.alumni.fullName}
                          </Link>
                        </div>
                      </div>

                      <div className="flex min-w-[13rem] flex-col gap-3">
                        <a
                          href={contactHref}
                          target={job.applyUrl ? "_blank" : undefined}
                          rel={job.applyUrl ? "noreferrer" : undefined}
                          className="rounded-full bg-burnt px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-ember"
                        >
                          {contactLabel}
                        </a>
                        <Link
                          href={`/alumni/${job.alumni.slug}`}
                          className="rounded-full border border-slate/15 bg-white px-4 py-3 text-center text-sm font-semibold text-slate transition hover:border-burnt/30 hover:text-burnt"
                        >
                          View alumni profile
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}