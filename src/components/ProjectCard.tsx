import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  location: string;
  status: "ongoing" | "delivered";
  images?: any[]; 
}

export function ProjectCard({ project }: { project: Project }) {
  // Extract first image url safely
  let coverImage = "/placeholder-project.jpg";
  if (project.images && project.images.length > 0) {
     const firstImg = project.images[0];
     if (typeof firstImg === 'string') {
        coverImage = firstImg; // might be id, but handle best case
     } else if (firstImg && typeof firstImg === 'object' && firstImg.url) {
        coverImage = firstImg.url;
     }
  }
  
  const brief = "Experience luxury living with premium amenities and exceptional design.";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-900 backdrop-blur-sm shadow-sm">
          {project.status}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{project.title}</h3>
        <div className="flex items-center text-sm text-neutral-500 mb-4">
          <MapPin className="mr-1 h-4 w-4 shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2 mb-6 flex-1">
          {brief}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
