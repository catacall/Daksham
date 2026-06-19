import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ongoing Projects | Daksham Developers",
  description: "Explore our currently developing premium real estate projects.",
};

export default async function OngoingProjectsPage() {
  const payload = await getPayload({ config: configPromise });
  
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    where: {
      status: {
        equals: "ongoing",
      },
    },
    sort: "-publishedAt",
  });

  return (
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8">
            <span className="text-cyan text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4 block">
              Current Developments
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-wide text-navy md:text-5xl lg:text-6xl">
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
