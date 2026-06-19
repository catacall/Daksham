import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";

export default async function DeliveredProjectsPage() {
  const payload = await getPayload({ config: configPromise });
  
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    where: {
      status: {
        equals: "delivered",
      },
    },
    sort: "-publishedAt",
  });

  return (
    <div className="bg-neutral-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Delivered Projects
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
            A testament to our commitment. Explore the landmark projects we have successfully handed over to our happy customers.
          </p>
        </div>
        
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
