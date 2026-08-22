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
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

