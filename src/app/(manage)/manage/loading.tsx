/**
 * loading.tsx — /manage route segment
 *
 * Next.js App Router wraps page.tsx in <Suspense> and renders this file
 * while the server component (ManagePage) is awaiting the Payload auth check.
 * This gives instant visual feedback instead of a blank screen on cold starts.
 */
export default function ManageLoading() {
  return (
    <div className="min-h-screen bg-off-white font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-light/80 pb-5 mb-8 animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-border-light/50 rounded-lg" />
            <div className="h-3 w-44 bg-border-light/30 rounded" />
          </div>
          <div className="h-10 w-32 bg-border-light/30 rounded-xl" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border-t-4 border-border-light/40 shadow-xs"
            >
              <div className="h-2.5 w-20 bg-border-light/60 rounded mb-3" />
              <div className="h-7 w-10 bg-border-light/40 rounded" />
            </div>
          ))}
        </div>

        {/* Tab bar skeleton */}
        <div className="flex justify-between items-center gap-4 mb-6 animate-pulse">
          <div className="flex bg-border-light/25 p-1 rounded-2xl border border-border-light/40 gap-1">
            {["Projects", "Enquiries", "Settings"].map(label => (
              <div
                key={label}
                className="px-5 py-2.5 rounded-xl bg-border-light/30 h-9 w-28"
              />
            ))}
          </div>
          <div className="h-10 w-36 bg-border-light/30 rounded-2xl" />
        </div>

        {/* Project card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-border-light/60 shadow-xs flex flex-col"
            >
              <div className="h-56 bg-border-light/30" />
              <div className="p-6 space-y-3 flex-1">
                <div className="h-5 bg-border-light/40 rounded w-3/4" />
                <div className="h-3 bg-border-light/30 rounded w-1/2" />
                <div className="h-px bg-border-light/40 mt-4" />
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 h-10 bg-border-light/30 rounded-2xl" />
                  <div className="w-20 h-10 bg-border-light/20 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
