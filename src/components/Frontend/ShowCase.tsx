/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function ShowCase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const scrollEl = scrollRef.current;
    const sectionEl = sectionRef.current;
    if (!scrollEl || !sectionEl) return;

    const ctx = gsap.context(() => {
      const totalScroll = () =>
        scrollEl.scrollWidth - window.innerWidth + window.innerWidth * 0.25;

      // Pin section and scrub horizontal scroll
      const hScroll = gsap.to(scrollEl, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollEl.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-card animations
      gsap.utils.toArray<HTMLElement>(".showcase-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".showcase-image");
        const details = card.querySelector<HTMLElement>(".showcase-details");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.88, filter: "brightness(0.5)" },
            {
              scale: 1.12,
              filter: "brightness(0.92)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: hScroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }

        if (details) {
          gsap.fromTo(
            details,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: hScroll,
                start: "left center+=30%",
                end: "right center-=30%",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-navy overflow-hidden flex flex-col justify-between py-12 sm:py-16 md:py-24"
    >
      {/* Title */}
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-10 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-white/10 pb-6 sm:pb-8"
        >
          <div>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display text-white font-medium uppercase leading-tight tracking-wider">
              Explore Landmarks
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs md:text-sm font-sans font-bold text-gold uppercase tracking-widest hover:text-cyan transition-colors duration-300"
          >
            View All Developments
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="flex items-center gap-8 sm:gap-12 md:gap-16 px-[8vw] sm:px-[10vw] md:px-[16vw] select-none h-[55vh] sm:h-[60vh] md:h-[65vh] will-change-transform"
      >
        {showcaseProjects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            className="showcase-card shrink-0 w-[80vw] sm:w-[70vw] md:w-[50vw] lg:w-[45vw] h-full relative overflow-hidden rounded-2xl sm:rounded-3xl bg-navy-light border border-white/5 shadow-2xl block cursor-pointer group"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="showcase-image object-cover object-center w-full h-full pointer-events-none select-none"
                sizes="(max-width: 768px) 80vw, 600px"
              />

              {/* Gradient overlay */}
              <div className="showcase-overlay absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-black/35 pointer-events-none z-10" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 z-20 pointer-events-none" />

              {/* Card details */}
              <div className="showcase-details absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 flex flex-col pointer-events-none">
                <span className="font-sans text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-cyan mb-1 sm:mb-2">
                  {project.location}
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-4xl text-white font-medium uppercase tracking-wide mb-2 sm:mb-3">
                  {project.title}
                </h3>
                <p className="font-sans text-[10px] sm:text-xs md:text-sm text-white/50 font-light max-w-sm">
                  {project.area}
                </p>
                <div className="mt-3 sm:mt-5 flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-gold group-hover:text-gold-light transition-colors duration-300">
                  <span>Explore Design</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
