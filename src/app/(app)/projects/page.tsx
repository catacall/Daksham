import { getPayloadClient } from "@/lib/payloadClient";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Projects in Navi Mumbai | Daksham Developers",
  description:
    "Explore Daksham Developers' complete portfolio of premium residential projects in Navi Mumbai and Thane. RERA approved. 2, 3 & 4 BHK luxury apartments.",
  alternates: { canonical: "https://dakshamdevelopers.com/projects" },
  openGraph: {
    url: "https://dakshamdevelopers.com/projects",
    title: "Real Estate Projects in Navi Mumbai | Daksham Developers",
    description:
      "Premium RERA-approved residential projects in Navi Mumbai & Thane by Daksham Developers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daksham Developers Projects",
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function AllProjectsPage() {
  let projects: any[] = [];
  let dbError = false;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects" as any,
      sort: "-publishedAt",
      depth: 2,
      pagination: false,
    });
    projects = result.docs as any;
  } catch (err) {
    console.error("[AllProjectsPage] Failed to fetch projects:", err);
    dbError = true;
  }

  return (
    <div className="bg-off-white min-h-screen px-5 py-20 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-8 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
            <h1 className="text-2xl sm:text-4xl font-display font-medium uppercase tracking-normal text-navy md:text-5xl lg:text-6xl leading-snug">
              All Developments
            </h1>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base font-sans text-muted max-w-2xl leading-relaxed">
              Discover our complete collection of premium real estate landmarks,
              blending luxury, quality, and visionary design.
            </p>
          </div>
        </FadeIn>
        {dbError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-2xl">⚠️</div>
            <h2 className="font-display text-xl sm:text-2xl text-navy uppercase">Unable to Load Projects</h2>
            <p className="text-sm font-sans text-muted max-w-sm leading-relaxed">
              We're having trouble connecting to our database. Please try again in a moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white text-xs font-sans font-bold uppercase tracking-normal hover:bg-navy/90 transition-colors"
              >
                Try Again
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border-light text-navy text-xs font-sans font-bold uppercase tracking-normal hover:bg-off-white transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          <ProjectGrid projects={projects} />
        )}
      </div>
    </div>
  );
}
