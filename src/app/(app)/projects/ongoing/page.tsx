import { getPayloadClient } from "@/lib/payloadClient";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ongoing Residential Projects in Navi Mumbai | Daksham Developers",
  description:
    "Discover Daksham Developers' ongoing residential projects in Navi Mumbai & Thane. RERA approved 2, 3 & 4 BHK luxury apartments with top amenities. Book your visit today.",
  alternates: { canonical: "https://dakshamdevelopers.com/projects/ongoing" },
  openGraph: {
    url: "https://dakshamdevelopers.com/projects/ongoing",
    title: "Ongoing Residential Projects in Navi Mumbai | Daksham Developers",
    description: "RERA approved ongoing luxury residential projects in Navi Mumbai by Daksham Developers. Enquire now.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ongoing Projects by Daksham Developers" }],
  },
};

export const dynamic = "force-dynamic";

export default async function OngoingProjectsPage() {
  let projects: any[] = [];
  let dbError = false;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects" as any,
      where: { status: { equals: "ongoing" } },
      sort: "-publishedAt",
      depth: 2,
      pagination: false,
    });
    projects = result.docs as any;
  } catch (err) {
    console.error("[OngoingProjectsPage] Failed to fetch projects:", err);
    dbError = true;
  }

  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-normal text-navy md:text-5xl lg:text-6xl">
              Ongoing Projects
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg font-sans text-muted max-w-2xl">
              Explore our current developments that are setting new benchmarks in quality, luxury, and design.
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
              <a href="/projects/ongoing" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white text-xs font-sans font-bold uppercase tracking-normal hover:bg-navy/90 transition-colors">
                Try Again
              </a>
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border-light text-navy text-xs font-sans font-bold uppercase tracking-normal hover:bg-off-white transition-colors">
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </div>
  );
}
