import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Info, Home as HomeIcon, IndianRupee } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const payload = await getPayload({ config: configPromise });
  
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
    },
    limit: 1,
  });

  const project = projects[0];

  if (!project) {
    notFound();
  }

  // Handle Images
  const images = (project.images || []).map((img: any) => {
    if (typeof img === "string") return img;
    return img.url || "/placeholder-project.jpg";
  });
  
  const coverImage = images[0] || "/placeholder-project.jpg";
  const galleryImages = images.slice(1);

  // Fallback description renderer if standard string, else JSON dump for complex Lexical
  let descriptionContent = null;
  if (typeof project.description === "string") {
     descriptionContent = <div dangerouslySetInnerHTML={{ __html: project.description }} />;
  } else if (project.description && typeof project.description === "object") {
     descriptionContent = <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(project.description, null, 2)}</pre>;
  }

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-neutral-900">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {project.status}
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <div className="mt-4 flex items-center text-lg text-neutral-200">
              <MapPin className="mr-2 h-5 w-5" />
              {project.location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-6 sm:grid-cols-4">
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</span>
                <span className="font-medium text-neutral-900 capitalize">{project.status}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Area</span>
                <span className="font-medium text-neutral-900">{project.area}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Price Range</span>
                <span className="font-medium text-neutral-900">{project.priceRange}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Location</span>
                <span className="font-medium text-neutral-900">{project.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral max-w-none">
              <h2>About {project.title}</h2>
              {descriptionContent || <p>Details coming soon.</p>}
            </div>

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900">Amenities & Specifications</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {project.amenities.map((amenityGroup: any, idx: number) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="font-semibold text-neutral-900 border-b pb-2">{amenityGroup.category}</h3>
                      <ul className="space-y-2 text-neutral-600">
                        {amenityGroup.items.split(',').map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900">Gallery</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {galleryImages.map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={img}
                        alt={`${project.title} Gallery ${idx + 1}`}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* Sticky Sidebar / Mobile Bottom Bar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-neutral-900">Interested in this project?</h3>
              <p className="mb-6 text-sm text-neutral-600">
                Get in touch with our team for more details, brochures, and site visits.
              </p>
              <Link
                href={`/contact?project=${project.id}`}
                className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Enquire Now
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden">
         <Link
            href={`/contact?project=${project.id}`}
            className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-3 text-base font-medium text-white shadow-sm"
          >
            Enquire Now
          </Link>
      </div>
    </div>
  );
}
