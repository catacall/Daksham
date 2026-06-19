import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FadeIn } from "@/components/FadeIn";

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
    <div className="bg-background min-h-screen px-4 py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-16 border-b border-border pb-8">
            <span className="text-accent text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
              Completed Landmarks
            </span>
            <h1 className="text-4xl font-display font-medium uppercase tracking-wide text-foreground sm:text-5xl lg:text-6xl">
              Delivered Projects
            </h1>
            <p className="mt-6 text-lg font-sans text-muted max-w-2xl">
              A testament to our commitment. Explore the landmark projects we have successfully handed over to our happy customers.
            </p>
          </div>
        </FadeIn>
        
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
