"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

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
    return baseX.on("change", (latest) => {
      if (!contentWidth) return;
      if (latest <= -contentWidth) {
        baseX.set(latest + contentWidth);
      } else if (latest > 0) {
        baseX.set(latest - contentWidth);
      }
    });
  }, [contentWidth, baseX]);


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

        </motion.div>
      </div>

      {/* Infinite Marquee Slider */}
      <div 
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex w-max"
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }} // Effectively infinite
          dragElastic={0}
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
        >
          {/* Set 1 (Measured) */}
          <div ref={measureRef} className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 pl-6 sm:pl-12 lg:pl-20">
            {displayProjects.map((project, idx) => (
              <div
                key={`set1-${idx}`}
                className="group shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] h-[45vh] sm:h-[50vh] md:h-[55vh] relative structural-panel-dark p-3 sm:p-4 block"
              >
                <Link href={`/projects/${project.slug}`} className="block w-full h-full" draggable={false}>
                  <div className="relative w-full h-full overflow-hidden border border-border-inverse/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      className="object-cover object-center pointer-events-none select-none transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90"
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 400px" />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
                      <p className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5">{project.location}</p>
                      <h3 className="text-white font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1">{project.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm font-sans font-light">{project.area}</p>
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
                className="group shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] h-[45vh] sm:h-[50vh] md:h-[55vh] relative structural-panel-dark p-3 sm:p-4 block"
              >
                <Link href={`/projects/${project.slug}`} className="block w-full h-full" draggable={false}>
                  <div className="relative w-full h-full overflow-hidden border border-border-inverse/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      className="object-cover object-center pointer-events-none select-none transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90"
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 400px" />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
                      <p className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5">{project.location}</p>
                      <h3 className="text-white font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1">{project.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm font-sans font-light">{project.area}</p>
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
