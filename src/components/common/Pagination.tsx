import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  hasNextPage?: boolean;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, hasNextPage = true, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-20 gap-4">
      {/* Tombol Back */}
      <button
        disabled={page === 1}
        onClick={() => {
          onPageChange(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium border border-green-500 
          text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 
          ${page === 1 ? "opacity-40 cursor-not-allowed" : "shadow-sm"}
        `}
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      {/* Nomor halaman */}
      <div className="flex items-center gap-2 bg-zinc-800/60 px-6 py-2 rounded-xl border border-zinc-700 shadow-inner">
        <span className="text-green-400 font-semibold tracking-wide">Page</span>
        <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {page}
        </span>
      </div>

      {/* Tombol Next */}
      <button
        disabled={!hasNextPage}
        onClick={() => {
          onPageChange(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium border border-green-500 
          text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 
          ${!hasNextPage ? "opacity-40 cursor-not-allowed" : "shadow-sm"}
        `}
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
