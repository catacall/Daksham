"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  settings?: any;
}

export default function Hero({ settings }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroMediaType = settings?.heroMediaType || "video";
  const heroVideoUrl = settings?.heroVideo?.url || settings?.heroVideoUrl || "/videoplayback.mp4";
  const heroPosterUrl = settings?.heroPoster?.url || settings?.heroPosterUrl || "/CLVjpg.webp";
  const heroImageUrl = settings?.heroImage?.url || "/CLVjpg.webp";
  const heroVideoEnabled = settings?.heroVideoEnabled !== false;

  useEffect(() => {
    // Check user accessibility preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !videoContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Scale up effect on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(videoContainerRef.current, {
          scale: 0.94,
          borderRadius: "3rem",
          y: 40,
          ease: "none"
        })
      });

      // Initial intro animation
      gsap.from(videoContainerRef.current, {
        scale: 0.97,
        opacity: 0,
        duration: 1.2,
        ease: "power1.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/projects";
  };

  const shouldPlayVideo =
    heroMediaType === "video" &&
    heroVideoEnabled &&
    !reducedMotion &&
    !videoError &&
    Boolean(heroVideoUrl);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full flex flex-col bg-off-white overflow-hidden"
    >
      {/* ═══ Video / Image Background Hero ═══ */}
      <div className="w-full min-h-screen pt-20 sm:pt-24 md:pt-28 px-3 sm:px-5 md:px-8 lg:px-10 pb-6 sm:pb-8 flex items-center justify-center">
        <div
          ref={videoContainerRef}
          className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:h-[calc(100vh-160px)] flex flex-col justify-end overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-navy shadow-2xl origin-center"
        >
          {shouldPlayVideo ? (
            <video
              src={heroVideoUrl}
              poster={heroPosterUrl}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              onCanPlay={(e) => {
                const v = e.currentTarget;
                v.style.transition = "opacity 1.2s ease";
                v.style.opacity = "0.6";
              }}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-0"
            />
          ) : (
            <Image
              src={heroMediaType === "image" ? heroImageUrl : heroPosterUrl}
              alt="Daksham Developers Luxury Architecture"
              fill
              priority
              quality={90}
              className="object-cover opacity-60 z-0"
              sizes="100vw"
            />
          )}

          {/* Controlled gradient overlay for high-contrast text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/70 z-0 pointer-events-none" />

          {/* ── Content overlay ── */}
          <div className="relative z-10 flex flex-col items-start px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:px-20 h-full text-left w-full max-w-7xl mx-auto justify-end gap-6 sm:gap-8 md:gap-10 lg:gap-12">

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl lg:max-w-3xl"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-wide leading-[1.2] mb-6 sm:mb-8 md:mb-10 drop-shadow-lg">
                SHAPING THE SKYLINE
                <br />
                <span className="bg-clip-text tracking-normal drop-shadow-[0_0_20px_rgba(251,225,52,0.5)] gold-gradient-text">
                  DEFINING
                </span>
                <br />
                YOU.
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-xl lg:max-w-2xl">
                Discover homes that redefine elegance and comfort.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pb-2"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 gold-gradient text-navy font-sans text-xs sm:text-sm font-black uppercase tracking-normal transition-all duration-300 w-full sm:w-auto text-center shadow-xl rounded-xl cursor-pointer"
              >
                View Residences
              </motion.button>
              <motion.button
                onClick={openEnquiry}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/15 border border-white/30 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-normal hover:bg-white hover:text-navy hover:border-white transition-all duration-300 w-full sm:w-auto text-center shadow-xl rounded-xl cursor-pointer"
              >
                Enquire Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ Virtual Tours Section ═══ */}
      <div className="w-full bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 relative mt-6 sm:mt-10 z-20 rounded-3xl sm:rounded-[3rem] shadow-sm border border-border-light/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">
              Interactive Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-navy uppercase">
              360° Virtual Walkthroughs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Ground Floor Tour Card */}
            <FadeIn delay={0.1}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="/api/media/file/amenity_lobby.webp"
                  alt="Ce La Vie Ground Floor Lobby"
                  fill
                  quality={90}
                  className="object-cover opacity-35 transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none" />

                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full z-10">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white uppercase tracking-wide leading-snug mb-4">
                    Ce La Vie &mdash; <span className="gold-gradient-text">Ground Floor</span>
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/90 mb-6 sm:mb-8 flex grow leading-relaxed">
                    Explore the lavish entrance, grand double-height lobby, and the
                    meticulously designed ground floor spaces that set the tone
                    for luxury living.
                  </p>

                  <motion.a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Ground_Floor?start=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-xl gold-gradient text-navy font-sans font-bold text-xs sm:text-sm uppercase tracking-normal transition-all duration-300 shadow-lg hover:shadow-gold/20 self-start"
                  >
                    Launch Virtual Tour
                  </motion.a>
                </div>
              </div>
            </FadeIn>

            {/* Amenities Floor Tour Card */}
            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="/api/media/file/celavie_pool.webp"
                  alt="Ce La Vie Amenities Floor"
                  fill
                  quality={90}
                  className="object-cover opacity-35 transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none" />

                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full z-10">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white uppercase tracking-wide leading-snug mb-4">
                    Ce La Vie &mdash; <span className="gold-gradient-text">Amenities</span>
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/90 mb-6 sm:mb-8 flex grow leading-relaxed">
                    Discover world-class recreational facilities, fitness
                    centers, and rooftop relaxation zones engineered for your
                    family&apos;s comfort and wellbeing.
                  </p>

                  <motion.a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Amenities_Floor?start=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-white/10 text-white border border-white/20 font-sans font-bold text-xs sm:text-sm uppercase tracking-normal transition-all duration-300 hover:bg-white hover:text-navy hover:border-white self-start"
                  >
                    Launch Virtual Tour
                  </motion.a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
