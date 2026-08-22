import { getPayloadClient } from "@/lib/payloadClient";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivered Residential Projects in Navi Mumbai | Daksham Developers",
  description:
    "Explore landmark residential projects successfully delivered by Daksham Developers in Navi Mumbai & Thane. Premium quality, on-time delivery, happy customers.",
  alternates: { canonical: "https://dakshamdevelopers.com/projects/delivered" },
  openGraph: {
    url: "https://dakshamdevelopers.com/projects/delivered",
    title: "Delivered Residential Projects in Navi Mumbai | Daksham Developers",
    description: "Landmark luxury projects delivered by Daksham Developers in Navi Mumbai. A testament to quality and commitment.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Delivered Projects by Daksham Developers" }],
  },
};

export const dynamic = "force-dynamic";

export default async function DeliveredProjectsPage() {
  let projects: any[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects" as any,
      where: { status: { equals: "delivered" } },
      sort: "-publishedAt",
      depth: 2,
      pagination: false,
    });
    projects = result.docs as any;
  } catch (err) {
    console.error("[DeliveredProjectsPage] Failed to fetch projects:", err);
  }

  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-normal text-navy md:text-5xl lg:text-6xl">
              Delivered Projects
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg font-sans text-muted max-w-2xl">
              A testament to our commitment. Explore the landmark projects we have successfully handed over to our happy customers.
            </p>
          </div>
        </FadeIn>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

