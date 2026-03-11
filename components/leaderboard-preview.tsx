import Link from "next/link";

import type { LeaderboardEntry } from "@/lib/types";

type LeaderboardPreviewProps = {
  entries: LeaderboardEntry[];
};

export default function LeaderboardPreview({ entries }: LeaderboardPreviewProps) {
  return (
    <aside className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burnt/70">Top 10</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-slate">Leaderboard</h2>
        </div>
        <Link href="/leaderboard" className="text-sm font-semibold text-burnt hover:text-ember">
          View all
        </Link>
      </div>

      <ol className="mt-6 space-y-3">
        {entries.map((entry, index) => (
          <li key={entry.id} className="rounded-2xl border border-slate/10 bg-cream px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate/45">#{index + 1}</p>
                <Link href={`/alumni/${entry.slug}`} className="mt-1 block font-semibold text-slate hover:text-burnt">
                  {entry.fullName}
                </Link>
                <p className="text-sm text-slate/70">
                  {entry.currentJobTitle} at {entry.company}
                </p>
              </div>
              <span className="rounded-full bg-burnt px-3 py-1 text-sm font-semibold text-white">{entry.starCount}</span>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

