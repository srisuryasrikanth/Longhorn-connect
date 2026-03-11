import Link from "next/link";

import { getLeaderboard } from "@/lib/services/alumni";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(10);

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 px-6 py-8 shadow-panel backdrop-blur md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Leaderboard</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-slate md:text-5xl">Top 10 alumni by stars</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate/75">
          This list updates from the local SQLite database, so stars from the home page and detail pages show up here on refresh.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
        <ol className="space-y-4">
          {leaderboard.map((entry, index) => (
            <li key={entry.id} className="rounded-[1.75rem] border border-slate/10 bg-cream p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate/45">Rank #{index + 1}</p>
                  <Link href={`/alumni/${entry.slug}`} className="mt-2 block font-[family-name:var(--font-display)] text-2xl text-slate hover:text-burnt">
                    {entry.fullName}
                  </Link>
                  <p className="mt-2 text-sm text-slate/75">
                    {entry.currentJobTitle} at {entry.company}
                  </p>
                  <p className="mt-1 text-sm text-slate/60">{entry.location}</p>
                </div>
                <div className="rounded-full bg-burnt px-5 py-3 text-center text-lg font-semibold text-white">{entry.starCount} stars</div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

