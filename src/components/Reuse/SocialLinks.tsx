"use client"

import { motion } from 'framer-motion';

export default function SocialLinks() {
  return (
    <>
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
          <i className="fi fi-brands-instagram"></i>
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
    </>
  );
}
