"use client"

import { motion } from 'framer-motion';

export default function SocialLinks() {
  return (
    <>
      <div className="flex gap-6">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="w-14 h-14 rounded-full bg-blue-200 hover:bg-blue-400 transition-colors flex items-center justify-center font-bold text-lg"
        >
          FB
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-400 transition-colors flex items-center justify-center font-bold text-lg"
        >
          X
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="w-14 h-14 rounded-full bg-pink-200 hover:bg-pink-400 transition-colors flex items-center justify-center font-bold text-lg"
        >
          <i className="fi fi-brands-instagram"></i>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center font-bold text-lg"
        >
          LI
        </motion.a>
      </div>
    </>
  );
}
