"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "125+",
    label: "Successful Projects",
    border: "lg:border-r",
  },
  {
    value: "25,000+",
    label: "Happy Residents Living the Paradise Life",
    border: "lg:border-r",
  },
  {
    value: "2 Cr",
    unit: "Sq.Ft.",
    label: "Of Landmark Projects Under Construction",
    border: "lg:border-r",
  },
  {
    value: "14,000",
    label: "Themed Luxury Residencies In Making",
    border: "",
  },
];

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 bg-background">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="eyebrow block mb-3 sm:mb-4">Our Legacy</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-bold uppercase leading-snug tracking-wide max-w-2xl">
            Developing Quality Real Estate Projects Since 1990
          </h2>
          {/* Gold divider */}
          <div className="mt-5 w-14 h-px bg-gold opacity-60" />
        </motion.div>

        {/* Stats Grid — 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-8 lg:gap-x-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={`flex flex-col border-b pb-6 lg:border-b-0 lg:pb-0 ${stat.border} border-border-light lg:px-8 first:lg:pl-0 last:lg:pr-0`}
            >
              <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-1">
                {stat.value}
                {stat.unit && (
                  <span className="text-base sm:text-xl font-medium ml-1 text-gold">
                    {stat.unit}
                  </span>
                )}
              </span>
              <span className="text-muted font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* WHO WE ARE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-28 structural-panel-dark px-6 py-12 sm:px-10 sm:py-16 md:px-20 md:py-24 relative overflow-hidden"
        >
          {/* subtle architectural graphic overlay */}
          <div className="absolute top-0 right-0 w-1/2 h-full border-l border-gold/10 opacity-50 pointer-events-none hidden lg:block" />
          
          <div className="max-w-4xl relative z-10 text-left">
            <span className="eyebrow block mb-4 text-gold">Who We Are</span>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-wide leading-snug">
              Pioneers of Global Lifestyle, Promising a Home of Luxury for All
            </h3>

            <div className="mt-8 w-16 h-px bg-gold opacity-80" />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p className="text-sm sm:text-base md:text-lg text-off-white/80 leading-relaxed font-medium">
                Hallmark of excellence. Benchmark of quality and trust. Icon of
                luxury and innovation. Symbol of commitment.
              </p>

              <div>
                <p className="text-sm sm:text-base md:text-lg text-off-white/80 leading-relaxed mb-6 font-medium">
                  For more than three decades, Daksham Developers has crafted a
                  legendary journey in the real estate landscape. Our legacy
                  reflects a glorious past, a prestigious present, and a progressive
                  future, creating spaces that elevate lifestyles and redefine
                  modern living.
                </p>

                <p className="text-sm sm:text-base md:text-lg text-off-white/80 leading-relaxed font-medium">
                  Every project is designed with a vision to deliver exceptional
                  quality, thoughtful planning, and world-class amenities, ensuring
                  that luxury is not merely experienced but truly lived.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
