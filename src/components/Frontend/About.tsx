"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "12",
    label: "Projects",
  },
  {
    value: "400–600",
    label: "Happy Families",
  },
  {
    value: "5L",
    unit: "Sq.ft.",
    label: "Delivered",
  },
  {
    value: "3–4L",
    unit: "Sq.ft.",
    label: "Ongoing & Upcoming",
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-[#B8BCC6] relative z-10">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-navy font-black uppercase tracking-normal leading-[1.1] max-w-4xl mx-auto">
            Developing Quality Real Estate Since 2015
          </h2>
          <div className="mt-8 w-24 h-1.5 gold-gradient mx-auto rounded-full" />
        </motion.div>

{/* WHO WE ARE - Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-navy rounded-[3rem] border border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden group mb-10"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-gold/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 gold-gradient/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-96 h-96 gold-gradient/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

          <div className="max-w-5xl relative z-10 mx-auto text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-normal leading-tight mb-12">
              Pioneers of Global Lifestyle, Promising a
              <span className="gold-gradient-text"> Home </span>of Luxury
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <p className="text-lg sm:text-xl md:text-2xl gold-gradient-text leading-relaxed font-medium">
                Hallmark of excellence. Benchmark of quality and trust. Icon of
                luxury and innovation. Symbol of commitment.
              </p>

              <div className="space-y-6 text-left">
                <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
                  Since 2015, Daksham Developers has crafted a legendary
                  journey in the real estate landscape. Our legacy reflects a
                  glorious past, a prestigious present, and a progressive
                  future, creating spaces that elevate lifestyles and redefine
                  modern living.
                </p>

                <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
                  Every project is designed with a vision to deliver exceptional
                  quality, thoughtful planning, and world-class amenities,
                  ensuring that luxury is not merely experienced but truly
                  lived.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24 ">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-[#1C1F24] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-8 sm:p-10 flex flex-col items-center text-center border border-white/5 transition-transform duration-300 hover:-translate-y-2 outline-2 outline-gold"
            >
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gold-gradient-text mb-4 drop-shadow-sm">
                {stat.value}
                {stat.unit && (
                  <span className="text-xl sm:text-2xl font-medium ml-1 gold-gradient-text/80">
                    {stat.unit}
                  </span>
                )}
              </span>
              <span className="text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-normal leading-relaxed">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        

      </div>
    </section>
  );
}
