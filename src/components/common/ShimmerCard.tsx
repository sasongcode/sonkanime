export default function ShimmerCard() {
    return (
      <div className="animate-pulse bg-zinc-800/40 rounded-xl overflow-hidden border border-zinc-700">
        <div className="aspect-[3/4] bg-zinc-700/60" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-zinc-600/70 rounded w-3/4"></div>
          <div className="h-3 bg-zinc-700/70 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
