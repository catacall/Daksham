"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

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
          scale: 0.9,
          borderRadius: "3rem",
          y: 50,
          ease: "none"
        })
      });

      // Initial intro animation
      gsap.from(videoContainerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full flex flex-col bg-platinum overflow-hidden"
    >
      {/* ═══ Video Background Hero ═══ */}
      <div className="w-full min-h-screen pt-20 sm:pt-24 md:pt-28 px-3 sm:px-5 md:px-8 lg:px-10 pb-6 sm:pb-8 flex items-center justify-center">
        <div
          ref={videoContainerRef}
          className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:h-[calc(100vh-160px)] flex flex-col justify-end overflow-hidden bg-navy shadow-2xl origin-center"
        >
          <video
            src="/videoplayback.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/10 to-navy/95 z-0 pointer-events-none" />

          {/* ── Content overlay ── */}
          <div className="relative z-10 flex flex-col items-start px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:px-20 h-full text-left w-full max-w-7xl mx-auto justify-end gap-6 sm:gap-8 md:gap-10 lg:gap-12">

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl lg:max-w-3xl"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-wide leading-[1.1] mb-4 sm:mb-5 md:mb-6 drop-shadow-lg">
                SHAPING THE SKYLINE
                <br />
                <span className="bg-clip-text tracking-widest drop-shadow-[0_0_20px_rgba(251,225,52,0.5)] gold-gradient-text">
                  DEFINING
                </span>
                <br />
                YOU.
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-xl lg:max-w-2xl">
                Discover homes that redefine elegance and comfort, crafted for
                those who expect the extraordinary.
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
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 gold-gradient text-navy font-sans text-xs sm:text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 w-full sm:w-auto text-center shadow-xl rounded-xl"
              >
                View Residences
              </motion.button>
              <motion.button
                onClick={openEnquiry}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/20 border border-white/30 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-navy hover:border-white transition-all duration-300 w-full sm:w-auto text-center shadow-xl rounded-xl"
              >
                Enquire Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ Virtual Tours Section ═══ */}
      <div className="w-full bg-off-white py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 relative -mt-10 z-20 rounded-t-4xl sm:rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            {/* <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-navy mb-3 sm:mb-4">
              THE ART OF LIVING REFILTERED.
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-navy-light max-w-2xl mx-auto leading-relaxed">
              Walk through the property from anywhere in the world. Begin your{" "}
              <strong>360°</strong> virtual tour.
            </p> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Ground Floor Tour Card */}
            <FadeIn delay={0.1}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-transparent bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-64 h-64 gold-gradient/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full z-10">
                 

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium gold-gradient-text uppercase tracking-wide mb-3 sm:mb-4">
                  Ce La Vie &mdash; Ground Floor
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white mb-6 sm:mb-8 md:mb-10 flex grow leading-relaxed">
                    Explore the lavish entrance, grand lobby, and the
                    meticulously designed ground floor spaces that set the tone
                    for luxury.
                  </p>

                  <motion.a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Ground_Floor?start=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-xl gold-gradient text-navy font-sans font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-gold/20 self-start"
                  >
                    Enter Tour
                  </motion.a>
                </div>
              </div>
            </FadeIn>

            {/* Amenities Floor Tour Card */}
            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-transparent bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-linear-to-br from-cyan/10 via-transparent to-gold/10 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full z-10">
                  

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium gold-gradient-text uppercase tracking-wide mb-3 sm:mb-4">
                  Ce La Vie &mdash; Amenities
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white mb-6 sm:mb-8 md:mb-10 flex grow leading-relaxed">
                    Discover world-class recreational facilities, fitness
                    centers, and spaces designed for your ultimate relaxation
                    and entertainment.
                  </p>

                  <motion.a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Amenities_Floor?start=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-white/10 text-white border border-white/20 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-navy hover:border-white self-start"
                  >
                    Enter Tour
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
