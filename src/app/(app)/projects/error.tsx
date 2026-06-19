"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-border-light p-6 sm:p-10 shadow-2xl text-center space-y-6 sm:space-y-8">
        <div className="mx-auto h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-navy">
            Something Went Wrong
          </h2>
          <p className="font-sans text-muted text-sm sm:text-base leading-relaxed">
            We encountered an unexpected error loading the projects page. This could be due to a temporary network issue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-navy transition-all hover:bg-gold-light active:scale-95 shadow-lg shadow-gold/10"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl bg-navy px-6 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-navy-light active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
