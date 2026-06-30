"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DeveloperProfile() {
  return (
    <section
      id="leadership"
      className="py-24 sm:py-32 bg-off-white relative z-10"
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-navy font-black uppercase tracking-tight leading-[1.1] max-w-4xl mx-auto">
            The Strength Behind Our Landmarks
          </h2>
          <div className="mt-8 w-24 h-1.5 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* Profile Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-navy rounded-[3rem] border border-gold shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden group"
        >
          {/* Subtle decorative glow */}
          <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Box: dd.png (Partnership logo graphic) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] aspect-square overflow-hidden rounded-3xl border border-border-inverse/50 bg-white shadow-xl transition-transform duration-500 group-hover:scale-105 p-6">
                <Image
                  src="/dd.png"
                  alt="Dashanzi, Daksham & Saar Collaboration"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-contain p-4"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Box: dakshampp.jpeg (Founder / Leader Photo) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] aspect-4/5 overflow-hidden rounded-3xl border border-border-inverse/50 shadow-xl transition-transform duration-500 group-hover:-translate-y-4">
                <Image
                  src="/dakshampp.jpeg"
                  alt="Visionary Leadership Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Description Text under the images */}
          <div className="mt-16 sm:mt-24 text-center max-w-4xl mx-auto relative z-10">
            <h3 className="text-gold font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider mb-6">
              Strategic Partnerships & Visionary Leadership
            </h3>
            <p className="font-sans text-white text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Our landmarks are built on a foundation of trust, collaboration,
              and unmatched expertise. By uniting the pioneering design
              philosophies of{" "}
              <strong className="text-gold font-bold">
                Dashanzi Developers
              </strong>
              , the engineering precision of{" "}
              <strong className="text-gold font-bold">
                Daksham Developers
              </strong>
              , and the robust marketing networks of{" "}
              <strong className="text-gold font-bold">Saar Properties</strong>,
              we deliver modern luxury homes that stand as testaments to
              quality. Guided by a customer-centric vision, our joint ventures
              ensure uncompromised excellence in every square foot we construct.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
