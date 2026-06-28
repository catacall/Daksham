"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const showcaseProjectsFallback = [
  {
    title: "Sai World City",
    location: "Panvel, Navi Mumbai",
    image: "/placeholder-project.jpg",
    area: "2, 3 & 4 BHK Luxury Condos",
    slug: "sai-world-city",
  },
  {
    title: "Paradise Mall",
    location: "Kharghar, Navi Mumbai",
    image: "/placeholder-project.jpg",
    area: "Ultra-Premium Highstreet Retail",
    slug: "paradise-mall",
  },
  {
    title: "Sai World Empire",
    location: "Kharghar, Navi Mumbai",
    image: "/placeholder-project.jpg",
    area: "3 & 4 BHK Neo-Classical Homes",
    slug: "sai-world-empire",
  },
  {
    title: "Sai World Legend",
    location: "Dombivli, Thane",
    image: "/placeholder-project.jpg",
    area: "Premium Residential Towers",
    slug: "sai-world-legend",
  },
  {
    title: "Sai World Dreams",
    location: "Dombivli, Thane",
    image: "/placeholder-project.jpg",
    area: "Premium Highstreet & Multiplex Hub",
    slug: "sai-world-dreams",
  },
];

interface ShowCaseProps {
  brochureUrl?: string | null;
}

export default function ShowCase({ brochureUrl }: ShowCaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [liveProjects, setLiveProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin-data/projects", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (data && data.docs && data.docs.length > 0) {
          setLiveProjects(data.docs);
        }
      })
      .catch(() => {});
  }, []);

  // Convert vertical mouse-wheel → horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
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
      className="relative bg-navy py-20 sm:py-24 md:py-32"
    >
      {/* Centered Header */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center pb-8 border-b border-border-inverse"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display text-white uppercase tracking-tight">
            Our Projects
          </h2>
          <p className="mt-6 eyebrow text-gold">
            Swipe or scroll to browse →
          </p>
        </motion.div>
      </div>

      {/* Horizontally scrollable card strip with snapping */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-6 sm:gap-8 px-6 sm:px-12 lg:px-20 pb-4 overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {displayProjects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            style={{ scrollSnapAlign: "start" }}
            className="group shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] h-[45vh] sm:h-[50vh] md:h-[55vh] relative structural-panel-dark p-3 sm:p-4 block"
          >
            {/* The Passepartout Inner Frame */}
            <div className="relative w-full h-full overflow-hidden border border-border-inverse/50">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center pointer-events-none select-none transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90"
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 400px"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Action Buttons below the carousel */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 mt-16 sm:mt-24">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/projects"
            className="w-full sm:w-auto text-center px-10 py-4 bg-transparent hover:bg-border-inverse border border-gold text-gold font-sans text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
          >
            View All Projects
          </Link>
          
          {brochureUrl && (
            <a
              href={brochureUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-10 py-4 bg-gold hover:bg-gold-light text-navy font-sans text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
            >
              Download Brochure
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
