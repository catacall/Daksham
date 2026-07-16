"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const showcaseProjectsFallback = [
  {
    title: "Ca Le Via",
    location: "Sector-34C, Kharghar",
    image: "/placeholder-project.webp",
    area: "Premium Residences",
    slug: "ca-le-via",
  },
  {
    title: "United Emporio",
    location: "Sector-11, Kharghar",
    image: "/placeholder-project.webp",
    area: "Commercial & Residential",
    slug: "united-emporio",
  },
  {
    title: "Ganesha Greens",
    location: "Sector-25, Ulwe",
    image: "/placeholder-project.webp",
    area: "Green Living Residences",
    slug: "ganesha-greens",
  },
  {
    title: "Orchid Residency",
    location: "Sector-14, Koparkharane",
    image: "/placeholder-project.webp",
    area: "Residential Apartments",
    slug: "orchid-residency",
  },
  {
    title: "Orchid Heights",
    location: "Sector-23, Ulwe",
    image: "/placeholder-project.webp",
    area: "High-Rise Residences",
    slug: "orchid-heights",
  },
  {
    title: "Orchid Arcade",
    location: "Sector-10, Vashi",
    image: "/placeholder-project.webp",
    area: "Commercial & Retail",
    slug: "orchid-arcade",
  },
  {
    title: "Orchid Bliss",
    location: "Sector-5, Ulwe",
    image: "/placeholder-project.webp",
    area: "Residential Apartments",
    slug: "orchid-bliss",
  },
  {
    title: "Orchid Homes",
    location: "Karjat",
    image: "/placeholder-project.webp",
    area: "Weekend & Residential Homes",
    slug: "orchid-homes",
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

  const measureRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setContentWidth(measureRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [liveProjects]);

  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;
    if (isHovered || isDragging.current) return;
    const moveBy = (40 / 1000) * delta; // Adjust speed here
    baseX.set(baseX.get() - moveBy);
  });

  useEffect(() => {
    return baseX.on("change", latest => {
      if (!contentWidth) return;
      if (latest <= -contentWidth) {
        baseX.set(latest + contentWidth);
      } else if (latest > 0) {
        baseX.set(latest - contentWidth);
      }
    });
  }, [contentWidth, baseX]);

  const displayProjects =
    liveProjects.length > 0
      ? liveProjects.map(p => ({
          title: p.title,
          location: p.location,
          image:
            typeof p.coverImage === "object" && p.coverImage !== null
              ? p.coverImage.url
              : "/placeholder-project.webp",
          area: p.area || "Premium Real Estate",
          slug: p.slug,
        }))
      : showcaseProjectsFallback;

  return (
    <section
      id="projects"
      className="relative bg-off-white py-20 sm:py-24 md:py-32"
    >
      {/* Centered Header */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-navy uppercase drop-shadow-sm font-black">
            Projects
          </h2>
          <div className="mt-6 w-20 h-1.5 gold-gradient rounded-full" />
        </motion.div>
      </div>

      {/* Infinite Marquee Slider */}
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex w-max pb-4 pt-4 mb-4 m-3 rounded-2xl"
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }} // Effectively infinite
          dragElastic={0}
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
        >
          {/* Set 1 (Measured) */}
          <div
            ref={measureRef}
            className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 pl-6 sm:pl-12 lg:pl-20 "
          >
            {displayProjects.map((project, idx) => (
              <div
                key={`set1-${idx}`}
                className="group shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] h-[45vh] sm:h-[50vh] md:h-[55vh] relative p-3 sm:p-4 block pb-4 pt-4 mb-4 m-3 rounded-2xl"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full"
                  draggable={false}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-3xl border border-transparent/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      quality={90}
                      className="object-cover object-center pointer-events-none select-none transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-90"
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 400px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-transparent flex flex-col justify-end p-6 sm:p-8 pointer-events-none transition-colors duration-500 group-hover:from-navy/90 group-hover:via-navy/60">
                      <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-12 sm:translate-y-14 group-hover:translate-y-0">
                        <p className="gold-gradient-text text-[10px] sm:text-xs font-bold uppercase tracking-normal mb-2">
                          {project.location}
                        </p>
                        <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-sans font-light mb-6">
                          {project.area}
                        </p>
                        <div className="opacity-0 transform translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-navy font-bold text-[10px] sm:text-xs uppercase tracking-normal shadow-lg">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Set 2 (Duplicate for Loop) */}
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
            {displayProjects.map((project, idx) => (
              <div
                key={`set2-${idx}`}
                className="group shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] h-[45vh] sm:h-[50vh] md:h-[55vh] relative p-3 sm:p-4 block pb-4 pt-4 mb-4 m-3 rounded-2xl"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full"
                  draggable={false}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-3xl border border-transparent/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      quality={90}
                      className="object-cover object-center pointer-events-none select-none transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-90"
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 400px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-transparent flex flex-col justify-end p-6 sm:p-8 pointer-events-none transition-colors duration-500 group-hover:from-navy/90 group-hover:via-navy/60">
                      <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-12 sm:translate-y-14 group-hover:translate-y-0">
                        <p className="gold-gradient-text text-[10px] sm:text-xs font-bold uppercase  mb-2">
                          {project.location}
                        </p>
                        <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-sans font-light mb-6">
                          {project.area}
                        </p>
                        <div className="opacity-0 transform translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-navy font-bold text-[10px] sm:text-xs uppercase shadow-lg">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons below the carousel */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 mt-16 sm:mt-24">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
            }
            href="/projects"
            className="w-full sm:w-auto text-center px-10 py-4 rounded-xl  bg-white text-navy font-sans text-xs font-bold uppercase tracking-normal transition-colors duration-300 cursor-pointer shadow-lg"
          >
            View All Projects
          </Link>

          {brochureUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="w-full sm:w-auto text-center px-10 py-4 rounded-xl gold-gradient hover:bg-white text-navy font-sans text-xs font-bold uppercase tracking-normal transition-colors duration-300 cursor-pointer shadow-lg"
            >
              Download Brochure
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
