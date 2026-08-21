"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
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
  coverImage?: string | StaticImageData | ProjectImageObject | null;
  images?: Array<string | StaticImageData | ProjectImageObject>;
  area?: string;
  priceRange?: string;
}

function isProjectImageObject(image: unknown): image is ProjectImageObject {
  return (
    typeof image === "object" &&
    image !== null &&
    "url" in image &&
    typeof (image as ProjectImageObject).url === "string"
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const fallbackImageMap: Record<string, string> = {
  "ce-la-vie": "/CLVjpg.webp",
  "ca-le-via": "/CLVjpg.webp",
  "united-emporio": "/UE-6.webp",
  "ganesha-greens": "/GG-4.webp",
  "orchid-residency": "/OR-1.webp",
  "orchid-heights": "/OH.webp",
  "orchid-arcade": "/OA.webp",
  "orchid-bliss": "/OBjpg.webp",
  "orchid-homes": "/OHS.webp",
};

function resolveImageUrl(img: unknown): string | StaticImageData {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (isProjectImageObject(img)) return img.url || "";
  return img as StaticImageData;
}

export function ProjectCard({ project }: { project: Project }) {
  // Priority: coverImage > images[0] > fallbackImageMap[slug] > /CLVjpg.webp
  let coverImage: string | StaticImageData = "";

  if (project.coverImage) {
    coverImage = resolveImageUrl(project.coverImage);
  } else if (project.images && project.images.length > 0) {
    coverImage = resolveImageUrl(project.images[0]);
  }

  if (!coverImage || coverImage === "/placeholder-project.webp") {
    coverImage = fallbackImageMap[project.slug] || "/CLVjpg.webp";
  }

  return (
    <motion.div
      variants={cardVariants}
      /* ── Hover: lift + shadow via Framer (not Tailwind) ── */
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(11,22,40,0.14), 0 4px 12px rgba(11,22,40,0.08)" }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-off-white">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-500" />
        <div className="absolute top-3 right-3 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-sans font-bold uppercase  gold-gradient-text shadow-sm border border-white/10">
          {project.status}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-display font-bold text-navy mb-1.5 sm:mb-2 group-hover:text-[#b8860b] transition-colors duration-200 leading-snug">
          {project.title}
        </h3>
        <div className="flex items-center text-xs font-sans text-muted mb-3">
          <MapPin className="mr-1 h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>

        {(project.area || project.priceRange) && (
          <div className="flex justify-between items-center text-xs font-sans text-muted/80 mb-4 pt-2.5 border-t border-border-light flex-1">
            {project.area && <span>Config: {project.area}</span>}
            {project.priceRange && <span className="text-navy font-bold">{project.priceRange}</span>}
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-navy px-4 py-3 text-xs sm:text-sm font-sans font-bold uppercase tracking-normal text-white hover:text-navy transition-all duration-200 hover:gold-gradient shadow-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
