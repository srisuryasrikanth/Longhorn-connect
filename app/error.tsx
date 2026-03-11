"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-[2rem] border border-red-200 bg-white px-6 py-10 text-center shadow-panel">
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-slate">Something went wrong.</h2>
      <p className="mt-3 text-sm leading-7 text-slate/70">The app hit an unexpected error while loading alumni data.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-burnt px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember"
      >
        Try again
      </button>
    </div>
  );
}

