"use client"
import { motion } from 'framer-motion';

export default function Connect() {
  return (
    <>
      <section id="connect" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h4 className="text-cyan text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-medium tracking-wide uppercase">
              Socials
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-navy font-medium uppercase leading-snug tracking-wide">
              Connect With Us
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy hover:bg-navy-light border border-border-dark hover:border-cyan transition-all flex items-center justify-center font-bold text-sm sm:text-lg text-white"
            >
              FB
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy hover:bg-navy-light border border-border-dark hover:border-cyan transition-all flex items-center justify-center font-bold text-sm sm:text-lg text-white"
            >
              X
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy hover:bg-navy-light border border-border-dark hover:border-gold transition-all flex items-center justify-center font-bold text-sm sm:text-lg text-white"
            >
              Ins
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy hover:bg-navy-light border border-border-dark hover:border-gold transition-all flex items-center justify-center font-bold text-sm sm:text-lg text-white"
            >
              LI
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}
