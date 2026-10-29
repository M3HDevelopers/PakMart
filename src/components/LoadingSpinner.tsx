import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-[var(--color-accent)]" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-[var(--color-border)] animate-pulse">
      <div className="w-full h-48 bg-[var(--color-bg-tertiary)]" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-[var(--color-bg-tertiary)] w-3/4" />
        <div className="h-3 bg-[var(--color-bg-tertiary)] w-1/2" />
        <div className="h-5 bg-[var(--color-bg-tertiary)] w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-[var(--color-border)] animate-pulse p-4">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 bg-[var(--color-bg-tertiary)] flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
