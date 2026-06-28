"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
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
      className="relative min-h-screen w-full bg-off-white flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left Column: Editorial Typography */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-32 pb-16 lg:py-32 z-10">
        <div className="max-w-xl">
          <motion.span
            {...fadeUp(0)}
            className="eyebrow block mb-8"
          >
            Daksham Developers
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy uppercase tracking-tight mb-8"
          >
            Engineering<br />
            <span className="italic text-gold">Luxury</span><br />
            Landmarks
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-lg sm:text-xl text-navy-light font-light leading-relaxed mb-12 max-w-md"
          >
            Crafting upscale spaces that blend timeless architectural brilliance,
            refined finishes, and modern engineering precision.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-navy text-white font-sans text-xs font-bold uppercase tracking-[0.15em] hover:bg-logo transition-colors duration-300 w-full sm:w-auto text-center"
            >
              View Residences
            </button>
            <button
              onClick={openEnquiry}
              className="px-8 py-4 bg-transparent border border-navy text-navy font-sans text-xs font-bold uppercase tracking-[0.15em] hover:bg-border-light transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Enquire Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Framed Media (Passepartout) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 lg:pl-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-4/5 lg:aspect-auto lg:h-[40vh] relative structural-panel-dark overflow-hidden group"
        >
          <video
            src="/videoplayback.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90"
          />
          {/* Subtle inner border for editorial feel */}
          <div className="absolute inset-4 sm:inset-6 border border-border-verse pointer-events-none z-10" />
        </motion.div>
      </div>
      
      {/* Structural Hairline Divider (Desktop only) */}
      {/* <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" /> */}
    </section>
  );
}
