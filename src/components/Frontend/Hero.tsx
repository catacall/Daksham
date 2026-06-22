"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export default function Hero() {
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
      className="h-screen min-w-screen bg-navy relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        src="/videoplayback.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 select-none pointer-events-none"
      />

      {/* Simple dark overlay for video readability */}
      <div className="absolute inset-0 bg-navy/50 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-5xl flex flex-col items-center">
        {/* Eyebrow */}
        <motion.span
          {...fadeUp(0)}
          className="text-gold text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-4 sm:mb-6 block "
        >
          Daksham Developers
        </motion.span>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-medium uppercase leading-[1.1] tracking-wide mb-6 sm:mb-8"
        >
          Engineering Luxury
          <span className="block mt-2">Landmarks</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-white/85 font-light max-w-2xl leading-relaxed mb-8 sm:mb-12"
        >
          Crafting upscale spaces that blend timeless architectural brilliance,
          refined finishes, and modern engineering precision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto items-center justify-center"
        >
          {/* Gold primary button */}
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 32px rgba(201,168,76,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-gold text-navy font-sans text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer"
          >
            Explore Landmark
          </motion.button>

          {/* Ghost button */}
          <motion.button
            onClick={openEnquiry}
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(46,196,196,1)",
              color: "rgba(46,196,196,1)",
              boxShadow: "0 8px 24px rgba(46,196,196,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-cyan/30 text-white font-sans text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl cursor-pointer"
          >
            Enquire 
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-linear-to-b from-white/50 to-transparent"
        />
        <span className="text-white/30 text-[9px] font-sans uppercase tracking-[0.2em]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
