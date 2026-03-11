import Link from "next/link";

import StarButton from "@/components/star-button";
import type { AlumniSearchResult } from "@/lib/types";
import { buildMailtoLink, formatEducation } from "@/lib/utils";

type AlumniCardProps = {
  result: AlumniSearchResult;
  showBreakdown: boolean;
};

type DisplayBreakdownKey = "jobTitle" | "company" | "location" | "education" | "helpTopics" | "starSignal";

const BREAKDOWN_ORDER: DisplayBreakdownKey[] = ["jobTitle", "company", "location", "education", "helpTopics", "starSignal"];

const BREAKDOWN_LABELS: Record<DisplayBreakdownKey, string> = {
  jobTitle: "Title",
  company: "Company",
  location: "Location",
  education: "UT education",
  helpTopics: "Bio/help",
  starSignal: "Stars"
};

export default function AlumniCard({ result, showBreakdown }: AlumniCardProps) {
  const { alumni, breakdown } = result;
  const mailtoLink = buildMailtoLink(alumni);

  return (
    <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate/70">
              <span className="rounded-full bg-burnt/10 px-3 py-1 font-semibold text-burnt">Rank #{result.rank}</span>
              <span>{alumni.location}</span>
              <span>{formatEducation(alumni)}</span>
            </div>
            <div>
              <Link href={`/alumni/${alumni.slug}`} className="font-[family-name:var(--font-display)] text-2xl text-slate hover:text-burnt">
                {alumni.fullName}
              </Link>
              <p className="mt-1 text-lg font-semibold text-slate/90">
                {alumni.currentJobTitle} at {alumni.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-sand px-3 py-1 font-medium text-slate">{alumni.companyType}</span>
            <span className="rounded-full bg-sage/15 px-3 py-1 font-medium text-slate">{alumni.industry}</span>
            {breakdown.matchedTerms.slice(0, 4).map((term) => (
              <span key={term} className="rounded-full border border-burnt/20 px-3 py-1 text-burnt">
                {term}
              </span>
            ))}
          </div>

          <p className="max-w-3xl text-sm leading-7 text-slate/80">{alumni.bio}</p>

          <div className="flex flex-wrap gap-3 text-sm text-slate/75">
            {result.summary.map((item) => (
              <span key={item} className="rounded-full border border-slate/10 bg-slate/5 px-3 py-1">
                {item}
              </span>
            ))}
          </div>

          {showBreakdown ? (
            <div className="rounded-2xl border border-burnt/10 bg-cream px-4 py-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-slate">Local relevance score: {result.score}</p>
                {BREAKDOWN_ORDER.filter((key) => breakdown[key] > 0).map((key) => (
                  <span key={key} className="text-sm text-slate/70">
                    {BREAKDOWN_LABELS[key]} {breakdown[key]}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[15rem]">
          <a
            href={mailtoLink}
            className="rounded-full border border-slate/15 bg-white px-4 py-2 text-center text-sm font-semibold text-slate transition hover:border-burnt/30 hover:text-burnt"
          >
            Message via email
          </a>
          <StarButton alumniId={alumni.id} initialStarCount={alumni.starCount} />
        </div>
      </div>
    </article>
  );
}

