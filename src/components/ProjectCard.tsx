"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    slug: string;
    status: "ongoing" | "delivered";
    location: string;
    area: string;
    priceRange: string;
    images?: Array<any> | null;
    publishedAt?: string | null;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Safe extraction of first image
  const firstImage = project.images?.[0];
  const imageUrl =
    firstImage && typeof firstImage === "object" && firstImage.url
      ? firstImage.url
      : "/logo.png";
  const imageAlt =
    firstImage && typeof firstImage === "object" && firstImage.alt
      ? firstImage.alt
      : project.title;

  const isOngoing = project.status === "ongoing";

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col h-full bg-transparent overflow-hidden"
      >
        {/* Image Container with Elegant Zoom */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900 rounded-xl border border-slate-200/50 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-background">
              <span className="font-display tracking-[0.2em] text-xs uppercase text-accent">
                Daksham
              </span>
            </div>
          )}

          {/* Dark luxury vignette overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Minimalist Status Badge */}
          <span
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md ${
              isOngoing
                ? "bg-amber-500/90 text-white"
                : "bg-emerald-600/90 text-white"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
            {isOngoing ? "Ongoing" : "Delivered"}
          </span>
        </div>

        {/* Content Section - Typographically Focused */}
        <div className="flex flex-col pt-5 pb-3 px-1 flex-1">
          {/* Subheading Specs: Location • Configuration */}
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            {project.location} &bull; {project.area}
          </span>

          {/* Title in display serif */}
          <h3 className="font-display text-xl lg:text-2xl text-foreground font-semibold uppercase tracking-wide group-hover:text-accent transition-colors duration-300 mt-2 mb-3">
            {project.title}
          </h3>

          {/* Price Range */}
          <p className="font-sans text-xs text-slate-500 font-semibold tracking-widest uppercase">
            Value: {project.priceRange}
          </p>

          {/* Luxury text link indicator */}
          <div className="mt-auto pt-4 flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-accent transition-colors duration-300">
            <span>Explore Landmark</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
