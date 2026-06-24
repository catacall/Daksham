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
    fetch("/api/projects?limit=10&depth=1&sort=-publishedAt")
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
      className="relative bg-navy py-12 sm:py-16 md:py-20"
    >
      {/* Centered Header */}
      <div className="container mx-auto px-5 sm:px-6 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center pb-6 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display text-white font-medium uppercase leading-tight tracking-wider">
            Our Projects
          </h2>
          <p className="mt-3 text-xs font-sans text-white/50 tracking-widest uppercase">
            Swipe or scroll to browse →
          </p>
        </motion.div>
      </div>

      {/* Horizontally scrollable card strip with snapping */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 sm:gap-5 px-5 sm:px-6 md:px-12 lg:px-16 pb-3 overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {displayProjects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            style={{ scrollSnapAlign: "start" }}
            className="group shrink-0 w-[78vw] sm:w-[46vw] md:w-[32vw] lg:w-[24vw] xl:w-[20vw] h-[42vh] sm:h-[44vh] md:h-[46vh] relative overflow-hidden rounded-[20px] bg-navy-light border border-white/8 shadow-md block"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 380px"
            />
          </Link>
        ))}
      </div>

      {/* Action Buttons below the carousel */}
      <div className="container mx-auto px-5 sm:px-6 mt-10 sm:mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Link
            href="/projects"
            className="w-full sm:w-auto text-center px-8 py-4 bg-transparent hover:bg-gold border border-gold/40 hover:border-gold text-gold hover:text-navy font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md cursor-pointer"
          >
            All Projects View
          </Link>
          
          {brochureUrl && (
            <a
              href={brochureUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-sans text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold/20 transition-all duration-300 cursor-pointer"
            >
              Download Brochure
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
