"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  location: string;
  status: "ongoing" | "delivered";
  images?: any[]; 
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

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
    <motion.div 
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 rounded-full bg-background/90 px-3 py-1 text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider text-foreground backdrop-blur-md shadow-sm border border-white/20">
          {project.status}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <div className="flex items-center text-sm font-sans text-muted mb-4">
          <MapPin className="mr-1 h-4 w-4 shrink-0 text-accent" />
          <span className="truncate">{project.location}</span>
        </div>
        <p className="text-sm font-sans text-muted line-clamp-2 mb-6 flex-1">
          {brief}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-sans font-medium text-background transition-colors hover:bg-accent hover:text-foreground"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
