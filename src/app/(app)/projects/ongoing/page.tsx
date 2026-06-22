import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import { Pagination } from "@/components/Pagination";
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

export default async function OngoingProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params?.page === "string" ? Math.max(1, parseInt(params.page, 10)) : 1;
  const limit = 6;

  const payload = await getPayload({ config: configPromise });
  
  const result = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: "projects" as any,
    where: {
      status: {
        equals: "ongoing",
      },
    },
    sort: "-publishedAt",
    page,
    limit,
  });

  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
           
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-wide text-navy md:text-5xl lg:text-6xl">
              Ongoing Projects
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg font-sans text-muted max-w-2xl">
              Explore our current developments that are setting new benchmarks in quality, luxury, and design.
            </p>
          </div>
        </FadeIn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProjectGrid projects={result.docs as any} />

        <Pagination
          currentPage={result.page || 1}
          totalPages={result.totalPages || 1}
          baseUrl="/projects/ongoing"
        />
      </div>
    </div>
  );
}

