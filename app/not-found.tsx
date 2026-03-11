import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/85 px-6 py-12 text-center shadow-panel backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burnt/70">Not found</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-slate">That alumni profile is not here.</h1>
      <p className="mt-4 text-sm leading-7 text-slate/70">Try returning to the home page and searching again.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-burnt px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember">
        Back to search
      </Link>
    </div>
  );
}

