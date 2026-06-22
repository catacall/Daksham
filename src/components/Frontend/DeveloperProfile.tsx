"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DeveloperProfile() {
  return (
    <section id="leadership" className="py-16 sm:py-20 md:py-24 bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-gold text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-3 block">
            Visionary Collaboration
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-medium uppercase leading-snug tracking-wide max-w-3xl mx-auto">
            The Strength Behind Our Landmarks
          </h2>
          <div className="mt-5 mx-auto w-16 h-px bg-gold opacity-60" />
        </motion.div>

        {/* Profile Card Container (matching user image layout) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-zinc-200/60 border border-zinc-300/40 rounded-[32px] p-6 sm:p-10 md:p-16 shadow-xl relative overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Box: dd.png (Partnership logo graphic) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-lg border border-zinc-300 bg-white p-2">
                <Image
                  src="/dd.png"
                  alt="Dashanzi, Daksham & Saar Collaboration"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>

            {/* Right Box: dakshampp.jpeg (Founder / Leader Photo) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-4/5 rounded-2xl overflow-hidden shadow-lg border border-zinc-300 bg-white">
                <Image
                  src="/dakshampp.jpeg"
                  alt="Visionary Leadership Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

          </div>

          {/* Description Text under the images */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h3 className="text-navy font-display text-lg sm:text-xl font-bold uppercase tracking-wider mb-4">
              Strategic Partnerships & Visionary Leadership
            </h3>
            <p className="font-sans text-muted text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Our landmarks are built on a foundation of trust, collaboration, and unmatched expertise. 
              By uniting the pioneering design philosophies of <strong>Dashanzi Developers</strong>, 
              the engineering precision of <strong>Daksham Developers</strong>, and the robust marketing 
              networks of <strong>Saar Properties</strong>, we deliver modern luxury homes that stand as 
              testaments to quality. Guided by a customer-centric vision, our joint ventures ensure 
              uncompromised excellence in every square foot we construct.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
