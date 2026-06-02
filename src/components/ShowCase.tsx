"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ShowCase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showcaseProjects = [
    {
      title: "Sai World City",
      location: "Panvel, Navi Mumbai",
      image: "/sai-world-city.jpg",
      area: "2, 3 & 4 BHK Luxury Condos",
      slug: "sai-world-city",
    },
    {
      title: "Paradise Mall",
      location: "Kharghar, Navi Mumbai",
      image: "/Paradise-mall.jpg",
      area: "Ultra-Premium Highstreet Retail",
      slug: "paradise-mall",
    },
    {
      title: "Sai World Empire",
      location: "Kharghar, Navi Mumbai",
      image: "/sai-world-empire.jpg",
      area: "3 & 4 BHK Neo-Classical Homes",
      slug: "sai-world-empire",
    },
    {
      title: "Sai World Legend",
      location: "Dombivli, Thane",
      image: "/sai-world-legend.jpg",
      area: "Premium Residential Towers",
      slug: "sai-world-legend",
    },
    {
      title: "Sai World Dreams",
      location: "Dombivli, Thane",
      image: "/Sai-World-Dreams.jpg",
      area: "Premium Highstreet & Multiplex Hub",
      slug: "sai-world-dreams",
    },
  ];

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const scrollContainer = scrollRef.current;
    const triggerContainer = containerRef.current;

    if (!scrollContainer || !triggerContainer) return;

    // Calculate total scrollable width
    const getScrollWidth = () => {
      return scrollContainer.scrollWidth - window.innerWidth + window.innerWidth * 0.35;
    };

    // Horizontal Scroll tween
    const horizontalScroll = gsap.to(scrollContainer, {
      x: () => -getScrollWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: triggerContainer,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // Animate individual card zoom as it swipes center
    const cards = gsap.utils.toArray(".showcase-card");
    cards.forEach((card: any) => {
      const img = card.querySelector(".showcase-image");
      const overlay = card.querySelector(".showcase-overlay");
      const details = card.querySelector(".showcase-details");

      // Scale and ease image zoom
      gsap.fromTo(
        img,
        { scale: 0.85, filter: "brightness(0.55)" },
        {
          scale: 1.15,
          filter: "brightness(0.9)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: "left right-=10%",
            end: "right left+=10%",
            scrub: true,
          },
        }
      );

      // Contrast card details opacity and y position
      gsap.fromTo(
        details,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: "left center+=25%",
            end: "right center-=25%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      // Clean up scrolltriggers
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between py-16 md:py-24"
    >
      {/* Title Header Block */}
      <div className="container mx-auto px-6 mb-10 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-accent text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-3 block">
              Exclusive Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-white font-medium uppercase leading-tight tracking-wider">
              Explore Landmarks
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs md:text-sm font-sans font-bold text-accent uppercase tracking-widest hover:text-white transition-colors duration-300"
          >
            View All Developments
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scrolling Panel Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-12 md:gap-16 px-[10vw] md:px-[20vw] select-none h-[60vh] md:h-[65vh] will-change-transform"
      >
        {showcaseProjects.map((project, idx) => (
          <div
            key={idx}
            className="showcase-card shrink-0 w-[70vw] md:w-[50vw] lg:w-[45vw] h-full relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 shadow-2xl"
          >
            {/* Project Image Panel */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="showcase-image object-cover object-center w-full h-full pointer-events-none select-none"
                sizes="(max-width: 768px) 80vw, 600px"
              />

              {/* Dark overlay with gold highlights */}
              <div className="showcase-overlay absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-black/35 pointer-events-none z-10" />

              {/* Centered Image Swipe Overlay Details */}
              <div className="showcase-details absolute bottom-8 left-8 right-8 z-20 flex flex-col pointer-events-none">
                <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-accent mb-2">
                  {project.location}
                </span>
                <h3 className="font-display text-2xl md:text-4xl text-white font-medium uppercase tracking-wide mb-3">
                  {project.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-slate-300 font-light max-w-sm">
                  {project.area}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-accent">
                  <span>Explore Design</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
