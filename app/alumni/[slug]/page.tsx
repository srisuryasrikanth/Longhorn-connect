import Link from "next/link";
import { notFound } from "next/navigation";

import StarButton from "@/components/star-button";
import { getAlumniDetailBySlug } from "@/lib/services/alumni";
import { buildMailtoLink, formatEducation, splitCommaList } from "@/lib/utils";

export const dynamic = "force-dynamic";

type AlumniDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AlumniDetailPage({ params }: AlumniDetailPageProps) {
  const { slug } = await params;
  const alumni = await getAlumniDetailBySlug(slug);

  if (!alumni) {
    notFound();
  }

  const helpTopics = splitCommaList(alumni.helpTopics);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm font-semibold text-burnt hover:text-ember">
        Back to search
      </Link>

      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 px-6 py-8 shadow-panel backdrop-blur md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Alumni detail</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-slate md:text-5xl">{alumni.fullName}</h1>
              <p className="mt-3 text-xl font-semibold text-slate/90">
                {alumni.currentJobTitle} at {alumni.company}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-sand px-3 py-1 font-medium text-slate">{alumni.companyType}</span>
              <span className="rounded-full bg-sage/15 px-3 py-1 font-medium text-slate">{alumni.industry}</span>
              <span className="rounded-full border border-slate/10 px-3 py-1 text-slate/80">{alumni.location}</span>
            </div>

            <p className="max-w-3xl text-base leading-8 text-slate/75">{alumni.bio}</p>
          </div>

          <div className="flex min-w-[16rem] flex-col gap-4 rounded-[2rem] border border-burnt/10 bg-cream p-5">
            <a
              href={buildMailtoLink(alumni)}
              className="rounded-full bg-burnt px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-ember"
            >
              Message via email
            </a>
            <StarButton alumniId={alumni.id} initialStarCount={alumni.starCount} />
            <div className="rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate/75">
              <p className="font-semibold text-slate">UT Austin education</p>
              <p className="mt-2">{formatEducation(alumni)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Help topics</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {helpTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-burnt/15 bg-burnt/5 px-4 py-2 text-sm text-burnt">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Contact details</p>
          <dl className="mt-4 space-y-4 text-sm text-slate/75">
            <div>
              <dt className="font-semibold text-slate">Email</dt>
              <dd className="mt-1">{alumni.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate">Location</dt>
              <dd className="mt-1">{alumni.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate">Stars</dt>
              <dd className="mt-1">{alumni.starCount}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

