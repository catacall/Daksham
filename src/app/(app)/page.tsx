import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/ProjectGrid";
import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch up to 6 featured projects
  const { docs: featuredProjects } = await payload.find({
    collection: "projects" as any,
    limit: 6,
    sort: "-publishedAt",
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-neutral-900 px-4 py-32 text-center text-white sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
            <Building className="mr-2 h-4 w-4" />
            Premium Real Estate Developer
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Building Landmarks, <br className="hidden sm:block" />
            Elevating Lifestyles.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Daksham Developers brings you exceptional residential and commercial spaces designed with unmatched quality and modern aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/projects/ongoing"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-white/20 bg-transparent px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-neutral-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
                Discover our latest and most sought-after properties, crafted to perfection.
              </p>
            </div>
            <Link
              href="/projects/ongoing"
              className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>
    </div>
  );
}
