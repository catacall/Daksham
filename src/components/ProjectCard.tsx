"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

import type { StaticImageData } from "next/image";

interface ProjectImageObject {
  url?: string;
  src?: string;
  [key: string]: unknown;
}

interface Project {
  slug: string;
  title: string;
  location: string;
  status: "ongoing" | "delivered";
  images?: Array<string | StaticImageData | ProjectImageObject>;
}

function isProjectImageObject(image: unknown): image is ProjectImageObject {
  return (
    typeof image === "object" &&
    image !== null &&
    "url" in image &&
    typeof (image as ProjectImageObject).url === "string"
  );
}

export function ProjectCard({ project }: { project: Project }) {
  // Extract first image safely (string | StaticImageData | ProjectImageObject)
  let coverImage: string | StaticImageData = "/placeholder-project.jpg";
  if (project.images && project.images.length > 0) {
    const firstImg = project.images[0];
    if (isProjectImageObject(firstImg)) {
      coverImage = firstImg.url || "/placeholder-project.jpg";
    } else if (typeof firstImg === "string") {
      coverImage = firstImg; // string URL
    } else {
      // assume StaticImageData
      coverImage = firstImg as StaticImageData;
    }
  }

  const brief =
    "Experience luxury living with premium amenities and exceptional design.";

  return (
    <motion.div className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-off-white">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-full bg-navy/90 px-3 py-1 text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider text-gold backdrop-blur-md shadow-sm border border-white/10">
          {project.status}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-display font-bold text-navy mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center text-xs sm:text-sm font-sans text-muted mb-3 sm:mb-4">
          <MapPin className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-cyan" />
          <span className="truncate">{project.location}</span>
        </div>
        <p className="text-xs sm:text-sm font-sans text-muted line-clamp-2 mb-4 sm:mb-6 flex-1">
          {brief}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-navy px-4 py-2.5 text-xs sm:text-sm font-sans font-medium text-white transition-colors hover:bg-gold hover:text-navy"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
