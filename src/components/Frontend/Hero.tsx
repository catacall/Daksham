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
    <section id="hero" className="relative w-full flex flex-col">
      {/* Video Background Hero Section */}
      <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-navy">
        <video
          src="/videoplayback.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/20 to-navy/90 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-7xl mx-auto pt-20">
          <motion.span
            {...fadeUp(0)}
            className="text-gold font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base drop-shadow-md"
          ></motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black text-[#7AE2CF] uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl w-full"
          >
            Experience
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-yellow-200 to-gold">
              True Luxury
            </span>
            <br />
            Living
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-lg sm:text-2xl text-white/90 font-medium mb-12 max-w-3xl drop-shadow-lg mx-auto"
          >
            Discover homes that redefine elegance and comfort, crafted for those
            who expect the extraordinary.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center sm:w-auto"
          >
            <button
              onClick={scrollToProjects}
              className="px-10 py-5 bg-gold text-navy font-sans text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300 w-full sm:w-auto text-center shadow-xl hover:scale-105 rounded-2xl"
            >
              View Residences
            </button>
            <button
              onClick={openEnquiry}
              className="px-10 py-5 bg-[#7AE2CF]/40 backdrop-blur-md border-2 border-white/30 text-white font-sans text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-navy hover:border-white transition-all duration-300 w-full sm:w-auto text-center shadow-xl hover:scale-105 rounded-2xl"
            >
              Enquire Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Virtual Tours Section Below Hero */}
      <div className="w-full bg-off-white py-24 px-6 sm:px-12 lg:px-20 relative -mt-10 z-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide text-navy mb-4">
              Have a look
            </h2>
            <p className="font-sans text-lg text-navy-light max-w-2xl mx-auto">
              Walk through the property from anywhere in the world. Choose a
              section to begin your 360° virtual tour.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Ground Floor Tour Card */}
            <FadeIn delay={0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-gold bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-8 sm:p-12 flex flex-col h-full z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gold/15 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-medium text-gold uppercase tracking-wide mb-4">
                    Ground Floor
                  </h3>
                  <p className="font-sans text-base text-white mb-10 flex grow">
                    Explore the lavish entrance, grand lobby, and the
                    meticulously designed ground floor spaces that set the tone
                    for luxury.
                  </p>

                  <a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Ground_Floor?start=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-xl bg-gold text-navy font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-gold/20 active:scale-95 self-start"
                  >
                    Enter Tour
                    
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Amenities Floor Tour Card */}
            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden rounded-3xl border border-gold bg-navy shadow-xl h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-linear-to-br from-cyan/10 via-transparent to-gold/10 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-8 sm:p-12 flex flex-col h-full z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-medium text-gold uppercase tracking-wide mb-4">
                    Amenities Floor
                  </h3>
                  <p className="font-sans text-base text-white mb-10 flex grow">
                    Discover world-class recreational facilities, fitness
                    centers, and spaces designed for your ultimate relaxation
                    and entertainment.
                  </p>

                  <a
                    href="https://digitour.housing.com/projects/SMB_Dashanizi_Group/Amenities_Floor?start=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-xl bg-white/10 text-white border border-white/20 font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-navy hover:border-white active:scale-95 self-start"
                  >
                    Enter Tour
                    
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
