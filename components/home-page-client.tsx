"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";

import AlumniCard from "@/components/alumni-card";
import LeaderboardPreview from "@/components/leaderboard-preview";
import type { FilterOptions, LeaderboardEntry, SearchApiResponse } from "@/lib/types";

type SearchFormState = {
  query: string;
  location: string;
  major: string;
  industry: string;
  companyType: string;
};

type HomePageClientProps = {
  initialSearch: SearchApiResponse;
  filterOptions: FilterOptions;
  leaderboard: LeaderboardEntry[];
};

const quickQueries = [
  "software engineers in Seattle who studied CS",
  "people in product at startups in Austin",
  "alumni working at big tech companies in New York",
  "marketing alumni in Los Angeles",
  "mission-driven alumni in Washington, DC"
];

function formStateFromSearch(search: SearchApiResponse): SearchFormState {
  return {
    query: search.query,
    location: search.filters.location ?? "",
    major: search.filters.major ?? "",
    industry: search.filters.industry ?? "",
    companyType: search.filters.companyType ?? ""
  };
}

export default function HomePageClient({ initialSearch, filterOptions, leaderboard }: HomePageClientProps) {
  const [searchState, setSearchState] = useState(initialSearch);
  const [formState, setFormState] = useState<SearchFormState>(() => formStateFromSearch(initialSearch));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasActiveSearch =
    searchState.query.trim().length > 0 ||
    Boolean(searchState.filters.location || searchState.filters.major || searchState.filters.industry || searchState.filters.companyType);

  async function runSearch(nextState: SearchFormState) {
    setError(null);

    startTransition(async () => {
      try {
        const params = new URLSearchParams();

        if (nextState.query.trim()) {
          params.set("q", nextState.query.trim());
        }

        for (const [key, value] of Object.entries(nextState)) {
          if (key !== "query" && value.trim()) {
            params.set(key, value.trim());
          }
        }

        const response = await fetch(`/api/search?${params.toString()}`, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Search is unavailable right now.");
        }

        const payload = (await response.json()) as SearchApiResponse;
        setSearchState(payload);
      } catch (searchError) {
        setError(searchError instanceof Error ? searchError.message : "Search is unavailable right now.");
      }
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(formState);
  }

  function handleSuggestion(query: string) {
    const nextState = { ...formState, query };
    setFormState(nextState);
    void runSearch(nextState);
  }

  function clearSearch() {
    const cleared = {
      query: "",
      location: "",
      major: "",
      industry: "",
      companyType: ""
    };

    setFormState(cleared);
    void runSearch(cleared);
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2.5rem] border border-burnt/10 bg-white/85 px-6 py-8 shadow-panel backdrop-blur md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-burnt/75">Student-facing MVP</p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight text-slate md:text-6xl">
              Find UT Austin alumni who can actually help with your next step.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate/75 md:text-lg">
              Search with plain language, discover fictional alumni across industries, reach out with a prefilled email, and browse alumni-posted roles.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/jobs"
                className="rounded-full bg-burnt px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember"
              >
                Explore job board
              </Link>
              <span className="text-sm text-slate/65">New: alumni can now post opportunities for students directly in the app.</span>
            </div>
          </div>
          <div className="rounded-[2rem] border border-burnt/15 bg-cream p-5">
            <p className="text-sm font-semibold text-slate">How ranking works</p>
            <p className="mt-2 text-sm leading-7 text-slate/75">
              Results use a local weighted score across job title, company, location, UT background, and help topics. Star count nudges ties but does not dominate relevance.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 rounded-[2rem] border border-slate/10 bg-cream/80 p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,0.7fr))]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Natural-language search</span>
              <input
                value={formState.query}
                onChange={(event) => setFormState((current) => ({ ...current, query: event.target.value }))}
                placeholder="software engineers in Seattle who studied CS"
                className="w-full rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate outline-none ring-0 transition focus:border-burnt/40"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Location</span>
              <select
                value={formState.location}
                onChange={(event) => setFormState((current) => ({ ...current, location: event.target.value }))}
                className="w-full rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate outline-none"
              >
                <option value="">All</option>
                {filterOptions.locations.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Major</span>
              <select
                value={formState.major}
                onChange={(event) => setFormState((current) => ({ ...current, major: event.target.value }))}
                className="w-full rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate outline-none"
              >
                <option value="">All</option>
                {filterOptions.majors.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Industry</span>
              <select
                value={formState.industry}
                onChange={(event) => setFormState((current) => ({ ...current, industry: event.target.value }))}
                className="w-full rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate outline-none"
              >
                <option value="">All</option>
                {filterOptions.industries.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate">Company type</span>
              <select
                value={formState.companyType}
                onChange={(event) => setFormState((current) => ({ ...current, companyType: event.target.value }))}
                className="w-full rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate outline-none"
              >
                <option value="">All</option>
                {filterOptions.companyTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-burnt px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember"
            >
              {isPending ? "Searching..." : "Search alumni"}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-full border border-slate/15 px-5 py-3 text-sm font-semibold text-slate transition hover:border-burnt/30 hover:text-burnt"
            >
              Clear
            </button>
            <span className="text-sm text-slate/60">Try a quick search:</span>
            {quickQueries.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestion(suggestion)}
                className="rounded-full border border-burnt/15 bg-white px-4 py-2 text-sm text-burnt transition hover:border-burnt/40 hover:bg-burnt/5"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_22rem]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Search results</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-slate">
                {searchState.results.length} alumni {hasActiveSearch ? "ranked by relevance" : "featured by stars"}
              </h2>
              <p className="mt-2 text-sm text-slate/70">
                {hasActiveSearch
                  ? "Computed order is shown on each card so students can understand why profiles surfaced."
                  : "Start with a query or filter to switch from featured mode to weighted relevance mode."}
              </p>
            </div>
            <div className="rounded-full border border-slate/10 bg-white px-4 py-2 text-sm text-slate/70">
              Ranking mode: {searchState.mode}
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          {isPending ? <div className="rounded-2xl border border-slate/10 bg-white px-4 py-3 text-sm text-slate/70">Refreshing results...</div> : null}

          {searchState.results.length > 0 ? (
            <div className="space-y-4">
              {searchState.results.map((result) => (
                <AlumniCard key={result.alumni.id} result={result} showBreakdown={hasActiveSearch} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate/20 bg-white/80 px-6 py-10 text-center shadow-panel">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-slate">No alumni matched that search.</h3>
              <p className="mt-3 text-sm leading-7 text-slate/70">
                Try widening the location, removing a filter, or searching for a broader role like software, product, finance, or nonprofit.
              </p>
            </div>
          )}
        </div>

        <LeaderboardPreview entries={leaderboard} />
      </section>
    </div>
  );
}