import { FadeIn } from "@/components/FadeIn";

export default function ProjectsLoading() {
  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
          <div className="h-4 w-32 bg-navy/10 rounded-full mb-3" />
          <div className="h-10 sm:h-12 w-64 sm:w-96 bg-navy/15 rounded-xl mb-4" />
          <div className="h-4 sm:h-5 w-full max-w-xl bg-navy/10 rounded-full mb-2" />
          <div className="h-4 sm:h-5 w-4/5 max-w-lg bg-navy/10 rounded-full" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-xs"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-4/3 w-full bg-navy/5" />
              {/* Content Skeleton */}
              <div className="flex flex-1 flex-col p-4 sm:p-6 space-y-4">
                <div className="h-6 w-3/4 bg-navy/10 rounded-lg" />
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-cyan/20 rounded-full shrink-0" />
                  <div className="h-4 w-1/2 bg-navy/10 rounded-md" />
                </div>
                <div className="h-px bg-border-light pt-1" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-20 bg-navy/10 rounded-md" />
                  <div className="h-4 w-24 bg-navy/10 rounded-md" />
                </div>
                <div className="h-10 w-full bg-navy/10 rounded-xl mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
