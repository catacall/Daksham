"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const showcaseProjects = [
  {
    title: "Sai World City",
    location: "Panvel, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    area: "2, 3 & 4 BHK Luxury Condos",
    slug: "sai-world-city",
  },
  {
    title: "Paradise Mall",
    location: "Kharghar, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    area: "Ultra-Premium Highstreet Retail",
    slug: "paradise-mall",
  },
  {
    title: "Sai World Empire",
    location: "Kharghar, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    area: "3 & 4 BHK Neo-Classical Homes",
    slug: "sai-world-empire",
  },
  {
    title: "Sai World Legend",
    location: "Dombivli, Thane",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    area: "Premium Residential Towers",
    slug: "sai-world-legend",
  },
  {
    title: "Sai World Dreams",
    location: "Dombivli, Thane",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    area: "Premium Highstreet & Multiplex Hub",
    slug: "sai-world-dreams",
  },
];

import { useState } from "react";

const showcaseProjectsFallback = [
  {
    title: "Sai World City",
    location: "Panvel, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    area: "2, 3 & 4 BHK Luxury Condos",
    slug: "sai-world-city",
  },
  {
    title: "Paradise Mall",
    location: "Kharghar, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    area: "Ultra-Premium Highstreet Retail",
    slug: "paradise-mall",
  },
  {
    title: "Sai World Empire",
    location: "Kharghar, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    area: "3 & 4 BHK Neo-Classical Homes",
    slug: "sai-world-empire",
  },
  {
    title: "Sai World Legend",
    location: "Dombivli, Thane",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    area: "Premium Residential Towers",
    slug: "sai-world-legend",
  },
  {
    title: "Sai World Dreams",
    location: "Dombivli, Thane",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    area: "Premium Highstreet & Multiplex Hub",
    slug: "sai-world-dreams",
  },
];

export default function ShowCase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [liveProjects, setLiveProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects?limit=10&depth=1&sort=-publishedAt")
      .then(res => res.json())
      .then(data => {
        if (data && data.docs && data.docs.length > 0) {
          setLiveProjects(data.docs);
        }
      })
      .catch(err => console.error("Error fetching projects for showcase:", err));
  }, []);

  // Convert vertical mouse-wheel → horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only hijack if the strip can still scroll horizontally
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY + e.deltaX, behavior: "auto" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const displayProjects = liveProjects.length > 0 
    ? liveProjects.map(p => ({
        title: p.title,
        location: p.location,
        image: typeof p.coverImage === "object" && p.coverImage !== null ? p.coverImage.url : "/placeholder-project.jpg",
        area: p.area || "Premium Real Estate",
        slug: p.slug,
      }))
    : showcaseProjectsFallback;

  return (
    <section
      id="projects"
      className="relative bg-navy py-12 sm:py-16 md:py-24"
    >
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 sm:pb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display text-white font-medium uppercase leading-tight tracking-wider">
              Our Projects
            </h2>
            {/* Scroll hint — visible, honest, disappears after user scrolls */}
            <p className="mt-2 text-xs font-sans text-white/35 tracking-wider">
              Scroll sideways to browse &nbsp;→
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-sans font-bold text-gold uppercase tracking-widest hover:text-cyan transition-colors duration-200 shrink-0"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>

      {/* Horizontally scrollable card strip */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 lg:px-16 pb-2 overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {displayProjects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            style={{ scrollSnapAlign: "start" }}
            className="group shrink-0 w-[78vw] sm:w-[52vw] md:w-[40vw] lg:w-[34vw] h-[52vh] sm:h-[58vh] md:h-[62vh] relative overflow-hidden rounded-2xl bg-navy-light border border-white/8 shadow-lg block"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 600px"
            />

            {/* Dark scrim */}
            <div className="absolute inset-0 bg-navy/55 z-10" />

            {/* Card info */}
            <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7 z-20">
              <span className="block font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-cyan mb-1">
                {project.location}
              </span>
              <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-white font-medium uppercase tracking-wide mb-1 sm:mb-2">
                {project.title}
              </h3>
              <p className="font-sans text-[10px] sm:text-xs text-white/50 mb-3 sm:mb-4">
                {project.area}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gold group-hover:text-gold-light transition-colors duration-200">
                View Project
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
