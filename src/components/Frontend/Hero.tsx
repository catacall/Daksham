"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

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
          <motion.span {...fadeUp(0)} className="eyebrow block mb-8">
            Daksham Developers
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy uppercase tracking-tight mb-8"
          >
            Engineering
            <br />
            <span className="italic text-gold">Luxury</span>
            <br />
            Landmarks
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-lg sm:text-xl text-navy-light font-light leading-relaxed mb-12 max-w-md"
          >
            Crafting upscale spaces that blend timeless architectural
            brilliance, refined finishes, and modern engineering precision.
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
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 p-6 sm:p-12 lg:p-20 lg:pl-0">
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
        <FadeIn delay={0.2}>
          <div className="space-y-6 sm:space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">
              Virtual Tour
            </h2>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-navy shadow-xl">
              {/* Background glow */}
              <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative p-6 sm:p-8 md:p-10">
                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10l4.553-2.277A1 1 0 0121 8.645v6.71a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                      />
                    </svg>
                  </div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    360° Immersive Experience
                  </p>
                </div>

                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-white uppercase tracking-wide mb-2">
                  Explore Every Corner
                </h3>
                <p className="font-sans text-sm text-white/50 mb-8 max-w-md">
                  Walk through the property from anywhere in the world. Choose a
                  floor to begin your virtual tour.
                </p>

                {/* Tour Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Ground_Floor?start=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gold text-navy font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 active:scale-95"
                  >
                    <span className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </span>
                    Enter Ground Floor Tour
                    <svg
                      className="w-4 h-4 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Amenities_Floor?start=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/10 text-white border border-white/20 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
                  >
                   
                    Enter Amenities Floor Tour
                    <svg
                      className="w-4 h-4 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Structural Hairline Divider (Desktop only) */}
      {/* <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" /> */}
    </section>
  );
}
