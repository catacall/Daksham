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
      className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center max-w-5xl flex flex-col items-center w-full">
        {/* Eyebrow */}
        <motion.span
          {...fadeUp(0)}
          className="text-accent text-[11px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.28em] uppercase mb-4 sm:mb-6 block"
        >
          Daksham Developers
        </motion.span>

        {/* Heading — readable on all mobile widths */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display text-[1.85rem] sm:text-4xl md:text-6xl lg:text-7xl text-logo font-medium uppercase leading-[1.15] tracking-wide mb-5 sm:mb-8"
        >
          Engineering Luxury
          <span className="block mt-1 sm:mt-2 relative">
            Landmarks
            {/* Underline Decoration similar to wireframe */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-1 sm:h-1.5 bg-accent rounded-full origin-left opacity-80"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-sans text-sm sm:text-base md:text-lg text-logo/80 font-light max-w-xs sm:max-w-xl md:max-w-2xl leading-relaxed mb-10 sm:mb-14"
        >
          Crafting upscale spaces that blend timeless architectural brilliance,
          refined finishes, and modern engineering precision.
        </motion.p>

        {/* Video Block (Inline, replaces background) */}
        <motion.div
          {...fadeUp(0.6)}
          className="w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-navy-light mb-10 sm:mb-16 relative group"
        >
          <video
            src="/videoplayback.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* CTAs — stacked on mobile, side-by-side on sm+ */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full max-w-[320px] sm:max-w-none sm:w-auto items-stretch sm:items-center justify-center"
        >
          {/* Logo primary button */}
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 32px rgba(84,143,139,0.35)", // rgba of #548F8B
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-full sm:w-auto text-center px-7 sm:px-8 py-3.5 sm:py-4 bg-logo text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer"
          >
            Explore Landmark
          </motion.button>

          {/* Ghost button */}
          <motion.button
            onClick={openEnquiry}
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(84,143,139,1)", // rgba of #548F8B
              color: "rgba(84,143,139,1)",
              boxShadow: "0 8px 24px rgba(84,143,139,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white border border-logo/40 text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl cursor-pointer"
          >
            Enquire Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
