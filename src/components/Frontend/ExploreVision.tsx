"use client";

import { motion } from "framer-motion";

export default function ExploreVision() {
  const cardVariants = (xOffset = 0, yOffset = 20, delay = 0) => ({
    initial: { opacity: 0, x: xOffset, y: yOffset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="vision-mission-values"
      className="py-14 sm:py-20 md:py-24 bg-off-white relative overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-logo/20" />

      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        
        {/* 3-Column Grid: Vision, Mission, Values — 1-col on small mobile, 3-col on md */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 md:gap-12 items-stretch text-center">
          
          {/* Column 1 - OUR VISION */}
          <motion.div
            {...cardVariants(-30, 0, 0)}
            className="structural-panel p-5 sm:p-6 bg-white shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-navy uppercase tracking-wider mb-3 sm:mb-4">
                OUR VISION
              </h2>
              <p className="text-muted text-sm leading-relaxed font-sans">
                Immerse yourself in our premier projects and architectural masterpieces, crafting landmark projects that stand the test of time.
              </p>
            </div>
            <div className="mt-5 mx-auto w-10 h-px bg-logo opacity-60" />
          </motion.div>

          {/* Column 2 - OUR MISSION */}
          <motion.div
            {...cardVariants(0, 30, 0.15)}
            className="structural-panel p-5 sm:p-6 bg-white shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-navy uppercase tracking-wider mb-3 sm:mb-4">
                OUR MISSION
              </h2>
              <p className="text-muted text-sm leading-relaxed font-sans">
                To become a leading Real Estate Company by providing a quality life to customers with the most luxurious and spacious building structures at convenient locations with world-class amenities.
              </p>
            </div>
            <div className="mt-5 mx-auto w-10 h-px bg-logo opacity-60" />
          </motion.div>

          {/* Column 3 - OUR VALUES */}
          <motion.div
            {...cardVariants(30, 0, 0.3)}
            className="structural-panel p-5 sm:p-6 bg-white shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-navy uppercase tracking-wider mb-3 sm:mb-4">
                OUR VALUES
              </h2>
              <p className="text-muted text-sm leading-relaxed font-sans">
                Transparency, integrity, innovation, and the highest standards of quality with a commitment to ensure that our customers' requirements are fully met.
              </p>
            </div>
            <div className="mt-5 mx-auto w-10 h-px bg-logo opacity-60" />
          </motion.div>

        </div>

        {/* Centered YouTube Video Embed (Merged Section) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-12 sm:mt-16 md:mt-20 relative aspect-video w-full max-w-4xl mx-auto overflow-hidden shadow-2xl border border-border-light bg-navy"
        >
          <iframe
            src="https://www.youtube.com/embed/hBo6d5q9_xY?rel=0"
            title="Daksham Developers - Video Presentation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
