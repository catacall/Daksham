import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    return `${baseUrl}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pages.push(
        <Link
          key={i}
          href={getPageUrl(i)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl font-sans text-sm font-semibold transition-all duration-300 ${
            isActive
              ? "bg-gold text-navy shadow-md shadow-gold/20 scale-105"
              : "border border-border-light bg-white text-muted hover:border-cyan hover:text-cyan hover:scale-105"
          }`}
        >
          {i}
        </Link>
      );
    }

    return pages;
  };

  return (
    <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-light bg-white text-muted transition-all duration-300 hover:border-cyan hover:text-cyan hover:scale-105"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-light bg-white/50 text-muted/30 cursor-not-allowed">
          <ChevronLeft className="h-5 w-5" />
        </span>
      )}

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-light bg-white text-muted transition-all duration-300 hover:border-cyan hover:text-cyan hover:scale-105"
          aria-label="Next Page"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-light bg-white/50 text-muted/30 cursor-not-allowed">
          <ChevronRight className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}
