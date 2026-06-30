"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "125+",
    label: "Successful Projects",
  },
  {
    value: "25,000+",
    label: "Happy Residents Living the Paradise Life",
  },
  {
    value: "2 Cr",
    unit: "Sq.Ft.",
    label: "Of Landmark Projects Under Construction",
  },
  {
    value: "14,000",
    label: "Themed Luxury Residencies In Making",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-off-white relative z-10">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="text-gold font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base drop-shadow-sm block">
            Our Legacy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-navy font-black uppercase tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Developing Quality Real Estate Since 1990
          </h2>
          <div className="mt-8 w-24 h-1.5 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10 flex flex-col items-center text-center border border-border-light transition-transform duration-300 hover:-translate-y-2"
            >
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gold mb-4 drop-shadow-sm">
                {stat.value}
                {stat.unit && (
                  <span className="text-xl sm:text-2xl font-medium ml-1 text-gold/80">
                    {stat.unit}
                  </span>
                )}
              </span>
              <span className="text-navy-light font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.15em] leading-relaxed">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* WHO WE ARE - Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-navy rounded-[3rem] border border-gold shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden group"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          
          <div className="max-w-5xl relative z-10 mx-auto text-center lg:text-left">
           

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-wide leading-tight mb-12">
              Pioneers of Global Lifestyle, Promising a 
              <span className="text-gold"> Home </span>of Luxury
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <p className="text-lg sm:text-xl md:text-2xl text-gold leading-relaxed font-medium">
                Hallmark of excellence. Benchmark of quality and trust. Icon of
                luxury and innovation. Symbol of commitment.
              </p>

              <div className="space-y-6 text-left">
                <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
                  For more than three decades, Daksham Developers has crafted a
                  legendary journey in the real estate landscape. Our legacy
                  reflects a glorious past, a prestigious present, and a progressive
                  future, creating spaces that elevate lifestyles and redefine
                  modern living.
                </p>

                <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
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
