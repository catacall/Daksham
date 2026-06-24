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
    <section id="about" className="py-14 sm:py-20 md:py-28 bg-white">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-medium uppercase leading-snug tracking-wide max-w-2xl">
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
                  <span className="text-base sm:text-xl font-medium ml-1 text-gold-dark">
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
          className="mt-16 md:mt-28 bg-amber-50 rounded-2xl sm:rounded-[32px] px-5 py-10 sm:px-8 sm:py-14 md:px-16 md:py-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            <span className="eyebrow block mb-4 text-gold">WHO WE ARE</span>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-navy tracking-wide leading-snug">
              Pioneers of Global Lifestyle, Promising a Home of Luxury for All
            </h3>

            <div className="mt-6 mx-auto w-14 h-px bg-gold opacity-60" />

            <p className="mt-8 text-sm sm:text-base md:text-lg text-muted leading-8 max-w-4xl mx-auto">
              Hallmark of excellence. Benchmark of quality and trust. Icon of
              luxury and innovation. Symbol of commitment.
            </p>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-muted leading-8 max-w-4xl mx-auto">
              For more than three decades, Paradise Group has crafted a
              legendary journey in the real estate landscape. Our legacy
              reflects a glorious past, a prestigious present, and a progressive
              future, creating spaces that elevate lifestyles and redefine
              modern living.
            </p>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-muted leading-8 max-w-4xl mx-auto">
              Every project is designed with a vision to deliver exceptional
              quality, thoughtful planning, and world-class amenities, ensuring
              that luxury is not merely experienced but truly lived.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
