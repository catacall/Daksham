"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DeveloperProfile() {
  const testimonials = [
    {
      quote:
        "Daksham Developers turned our vision into a landmark project with precision, trust, and world-class execution.",
      name: "Rumesha Patel",
      role: "Residential Investor",
      // stable Unsplash asset (direct image URL)
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    },
    {
      quote:
        "Their team delivered exceptional quality and kept communication seamless throughout the entire process.",
      name: "Shilpa Desai",
      role: "Homebuyer",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    },
    {
      quote:
        "Amit Karla's leadership brings credibility and clarity to every partnership we've built together.",
      name: "Neha Sharma",
      role: "Strategic Partner",
      image:
        "https://images.unsplash.com/photo-1545996124-1aef1b1c6fef?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    },
  ];

  const marqueeWidth = testimonials.length * 370;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOffset(prev => (prev <= -marqueeWidth ? 0 : prev - 0.75));
    }, 20);
    return () => window.clearInterval(interval);
  }, [marqueeWidth]);

  return (
    <>
      <section
        id="leadership"
        className="py-24 sm:py-32 bg-platinum relative z-10"
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display gold-gradient-text-gradient font-black uppercase tracking-normal leading-[1.1] max-w-4xl mx-auto">
              The Strength Behind Our Landmarks
            </h2>
            <div className="mt-8 w-24 h-1.5 gold-gradient mx-auto rounded-full" />
          </motion.div>

          {/* Profile Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black rounded-[3rem] border border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-16 sm:px-16 sm:py-24 relative overflow-hidden group"
          >
            {/* Subtle decorative glow */}
            <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-cyan/10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 gold-gradient/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-20">
              {/* Left Box: dd.png (Partnership logo graphic) */}
              <div className="flex justify-center">
                {/* Right Box: dakshampp.jpeg (Founder / Leader Photo) */}

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

              {/* Description Text under the images */}
              <div className="mt-16 sm:mt-24 text-center max-w-4xl mx-auto relative z-10">
                <h3 className="gold-gradient-text font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-normal mb-6">
                  Amit Karla
                </h3>
                <p className="font-sans text-white text-base sm:text-lg leading-relaxed max-w-3xl mx-auto tracking-normal">
                  Our landmarks are built on a foundation of trust,
                  collaboration, and unmatched expertise, the engineering
                  precision of <strong className="gold-gradient-text font-bold">
                    Daksham Developers
                  </strong>{" "}
                  and the robust marketing networks of <strong className="gold-gradient-text font-bold">
                    modern luxury homes
                  </strong>{" "}
                  deliver projects that stand as testaments to quality.
                  Guided by a <strong className="gold-gradient-text font-bold">
                    customer-centric vision
                  </strong>, our joint ventures ensure uncompromised excellence in every square foot we construct.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Marquee */}
          
          
          <div
            className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 px-4 py-8 sm:px-6 sm:py-10"
          >
                <p className="text-xs uppercase  text-cyan font-bold">
                  Testimonials
                </p>
                <h3 className="mt-3 text-3xl sm:text-4xl font-display text-navy font-black ">
                  Trusted by buyers, partners and investors.
                </h3>
              
              
              <div className="relative z-10 mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              
              

            </div>
            
            <div className="relative overflow-hidden">
              {/* Edge fades only over the marquee (cards) so header text remains unaffected */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-platinum via-platinum to-transparent z-1" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-platinum via-platinum to-transparent z-1" />

              <div
                className="flex gap-5 whitespace-nowrap"
                style={{ transform: `translateX(${offset}px)` }}
              >
                {Array.from({ length: 2 }).flatMap((_, groupIndex) =>
                  testimonials.map((item, index) => (
                    <motion.div
                      key={`${groupIndex}-${index}`}
                      whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(212, 175, 55, 0.3)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] max-w-[280px] sm:max-w-[320px] md:max-w-[350px] flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-[0_12px_35px_rgba(7,18,42,0.25)]"
                      style={{
                        background: "linear-gradient(135deg, rgba(11, 22, 40, 0.95), rgba(7, 18, 42, 0.98))",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-4 sm:p-6 h-full">
                        {/* Profile Photo - Left */}
                        <div className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={96}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e: any) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/placeholder-project.jpg";
                            }}
                          />
                        </div>

                        {/* Quote and Name - Right */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-100 font-sans tracking-normal">
                            "{item.quote}"
                          </p>
                          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3">
                            <p className="font-display text-sm sm:text-base font-bold text-gold truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-white tracking-normal">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
