import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ApiMeta } from '@/core/api/types';

interface PaginationProps {
  meta?: ApiMeta;
  page: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ meta, page, onChange }: PaginationProps) => {
  const totalPages = meta?.totalPages ?? 1;
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-1 pt-4">
      <p className="text-[12px] font-semibold text-muted">
        Halaman <span className="text-ink font-bold">{page}</span> dari {totalPages}
        {meta && <span> • {meta.total} data</span>}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};
