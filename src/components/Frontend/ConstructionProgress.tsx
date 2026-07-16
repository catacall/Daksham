"use client";

import { motion } from "framer-motion";

interface ConstructionProgressProps {
  progress: number;
  imageUrl?: string | null;
  projectTitle: string;
}

export default function ConstructionProgress({
  progress,
  imageUrl,
  projectTitle,
}: ConstructionProgressProps) {
  return (
    <div className="space-y-6 sm:space-y-8 my-10 sm:my-12">
      <h2 className="font-display text-2xl sm:text-3xl text-navy font-medium uppercase tracking-normal mb-4 sm:mb-6">
        Current Status
      </h2>

      {imageUrl && (
        <div className="border border-border-light bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
          <img
            src={imageUrl}
            alt={`${projectTitle} Current Construction Status`}
            className="w-full h-auto block"
          />
        </div>
      )}

      {/* Progress bar container */}
      <div className="space-y-3.5 bg-[#D8DCE4] border border-[#BF953F]/10 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex justify-between items-center text-navy font-sans text-xs sm:text-sm font-bold uppercase tracking-normal">
          <span>Overall Construction Progress</span>
          <span className="gold-gradient-text text-sm sm:text-base">{progress}% Work Completed</span>
        </div>
        <div className="w-full h-4 bg-navy/10 rounded-full overflow-hidden border border-navy/5 p-0.5 relative">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full gold-gradient shadow-xs"
          />
        </div>
      </div>
    </div>
  );
}
