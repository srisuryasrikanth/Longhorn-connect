export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-[2.5rem] bg-white/70 shadow-panel" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_22rem]">
        <div className="space-y-4">
          <div className="h-48 animate-pulse rounded-[2rem] bg-white/70 shadow-panel" />
          <div className="h-48 animate-pulse rounded-[2rem] bg-white/70 shadow-panel" />
        </div>
        <div className="h-96 animate-pulse rounded-[2rem] bg-white/70 shadow-panel" />
      </div>
    </div>
  );
}

