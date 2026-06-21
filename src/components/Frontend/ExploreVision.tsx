"use client";

import { motion } from "framer-motion";
import Carousel from "../Carousel";

export default function ExploreVision() {
  return (
    <section
      id="swc-carousel"
      className="py-12 sm:py-16 md:py-20 bg-off-white overflow-hidden relative"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT - OUR VISION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3  rounded-3xl p-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy">
              OUR VISION
            </h2>

            <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
              Immerse yourself in our premier projects and architectural
              masterpieces.
            </p>

            <div className="mt-6 mx-auto w-12 h-px bg-gold opacity-60" />
          </motion.div>

          {/* CENTER - CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <Carousel />
          </motion.div>

          {/* RIGHT - OUR MISSION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3  rounded-3xl p-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy">
              OUR MISSION
            </h2>

            <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
              To become a successful Real Estate Company by providing a quality
              life to customers with most luxurious & spacious building
              structures at convenient locations with world-class amenities.
            </p>

            <div className="mt-6 mx-auto w-12 h-px bg-gold opacity-60" />
          </motion.div>
        </div>

        {/* VALUES BELOW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10  rounded-3xl p-6 text-center max-w-5xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy">
            OUR VALUES
          </h2>

          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            Transparency, responsibility, integrity, innovation, highest
            standards of quality, with a commitment to ensure that customers'
            requirements are fully understood and met.
          </p>

          <div className="mt-6 mx-auto w-12 h-px bg-gold opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
