"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const openEnquiry = () => {
    const event = new CustomEvent("open-enquiry-modal");
    window.dispatchEvent(event);
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSec = document.getElementById("projects");
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/projects";
    }
  };

  return (
    <section
      id="hero"
      className="h-screen bg-foreground/90 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        src="/videoplayback.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-77 select-none pointer-events-none"
      />

      {/* Layered Gradient Overlays for High-End Readability */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/40 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/30 to-slate-950/90 z-0 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl flex flex-col items-center">
        {/* Animated Gold Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-accent text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-6 block"
        >
          Daksham Developers
        </motion.span>

        {/* Animated Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-medium uppercase leading-[1.1] tracking-wide mb-8"
        >
          Engineering Luxury
          <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-accent via-amber-300 to-accent">
            Landmarks
          </span>
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-base md:text-lg lg:text-xl text-slate-300 font-light max-w-2xl leading-relaxed mb-12 drop-shadow-sm"
        >
          Crafting upscale spaces that blend timeless architectural brilliance,
          refined finishes, and modern engineering precision.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center justify-center"
        >
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="w-full sm:w-auto text-center px-8 py-4 bg-accent hover:bg-amber-400 text-foreground transition-all duration-300 font-sans text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-accent/20 cursor-pointer"
          >
            Explore Landmarks
          </a>
          <button
            onClick={openEnquiry}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-white/30 hover:border-accent text-white hover:text-accent transition-all duration-300 font-sans text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl cursor-pointer"
          >
            Private Advisory
          </button>
        </motion.div>
      </div>

    </section>
  );
}
