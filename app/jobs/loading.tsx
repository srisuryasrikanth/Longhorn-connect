export default function JobsLoading() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 px-6 py-8 shadow-panel backdrop-blur md:px-10">
        <div className="space-y-4">
          <div className="h-4 w-32 rounded-full bg-burnt/15" />
          <div className="h-12 w-full max-w-3xl rounded-full bg-slate/10" />
          <div className="h-6 w-full max-w-2xl rounded-full bg-slate/10" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
          <div className="space-y-4">
            <div className="h-6 w-40 rounded-full bg-slate/10" />
            <div className="h-12 w-full rounded-2xl bg-slate/10" />
            <div className="h-12 w-full rounded-2xl bg-slate/10" />
            <div className="h-32 w-full rounded-[1.5rem] bg-slate/10" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel backdrop-blur">
              <div className="space-y-4">
                <div className="h-4 w-48 rounded-full bg-slate/10" />
                <div className="h-10 w-full max-w-xl rounded-full bg-slate/10" />
                <div className="h-20 w-full rounded-[1.5rem] bg-slate/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}