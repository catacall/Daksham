import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";

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
    <div className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Ongoing Projects
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
            Explore our current developments that are setting new benchmarks in quality and design.
          </p>
        </div>
        
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
