import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import { Pagination } from "@/components/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Projects in Navi Mumbai | Daksham Developers",
  description:
    "Explore Daksham Developers' complete portfolio of premium residential projects in Navi Mumbai and Thane. RERA approved. 2, 3 & 4 BHK luxury apartments.",
  alternates: { canonical: "https://dakshamdevelopers.com/projects" },
  openGraph: {
    url: "https://dakshamdevelopers.com/projects",
    title: "Real Estate Projects in Navi Mumbai | Daksham Developers",
    description: "Premium RERA-approved residential projects in Navi Mumbai & Thane by Daksham Developers.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Daksham Developers Projects" }],
  },
};

export default async function AllProjectsPage({
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
    sort: "-publishedAt",
    page,
    limit,
  });

  return (
    <div className="bg-off-white min-h-screen px-5 py-20 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-8 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
            <span className="eyebrow block mb-2 sm:mb-3">
              Our Portfolio
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-medium uppercase tracking-wide text-navy md:text-5xl lg:text-6xl leading-snug">
              All Developments
            </h1>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base font-sans text-muted max-w-2xl leading-relaxed">
              Discover our complete collection of premium real estate landmarks, blending luxury, quality, and visionary design.
            </p>
          </div>
        </FadeIn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProjectGrid projects={result.docs as any} />
        
        <Pagination
          currentPage={result.page || 1}
          totalPages={result.totalPages || 1}
          baseUrl="/projects"
        />
      </div>
    </div>
  );
}

