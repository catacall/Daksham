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
      className="py-16 sm:py-24 bg-white relative overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl">
        {/* Centered YouTube Video Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden shadow-2xl rounded-3xl bg-navy border border-border-light mb-16 sm:mb-20"
        >
          <iframe
            src="https://www.youtube.com/embed/hBo6d5q9_xY?rel=0"
            title="Daksham Developers - Video Presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full relative z-10"
          ></iframe>
        </motion.div>

        {/* 3-Column Grid: Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch text-center">
          
          {/* Column 1 - OUR VISION */}
          <motion.div
            {...cardVariants(-30, 0, 0)}
            className="bg-off-white rounded-3xl shadow-sm p-8 sm:p-10 flex flex-col justify-between border border-border-light/60 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-navy uppercase tracking-wide leading-relaxed mb-6">
                Our Vision
              </h2>
              <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-sans font-medium">
                Immerse yourself in our premier projects and architectural masterpieces, crafting landmark projects that stand the test of time.
              </p>
            </div>
            <div className="mt-8 mx-auto w-12 h-1 gold-gradient opacity-80 rounded-full" />
          </motion.div>

          {/* Column 2 - OUR MISSION */}
          <motion.div
            {...cardVariants(0, 30, 0.15)}
            className="bg-off-white rounded-3xl shadow-sm p-8 sm:p-10 flex flex-col justify-between border border-border-light/60 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-navy uppercase tracking-wide leading-relaxed mb-6">
                Our Mission
              </h2>
              <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-sans font-medium">
                To become a leading Real Estate Company by providing a quality life to customers with the most luxurious and spacious building structures at convenient locations with world-class amenities.
              </p>
            </div>
            <div className="mt-8 mx-auto w-12 h-1 gold-gradient opacity-80 rounded-full" />
          </motion.div>

          {/* Column 3 - OUR VALUES */}
          <motion.div
            {...cardVariants(30, 0, 0.3)}
            className="bg-off-white rounded-3xl shadow-sm p-8 sm:p-10 flex flex-col justify-between border border-border-light/60 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-navy uppercase tracking-wide leading-relaxed mb-6">
                Our Values
              </h2>
              <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-sans font-medium">
                Transparency, integrity, innovation, and the highest standards of quality with a commitment to ensure that our customers' requirements are fully met.
              </p>
            </div>
            <div className="mt-8 mx-auto w-12 h-1 gold-gradient opacity-80 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
