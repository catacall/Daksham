"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ProjectCurrentStatusProps {
  progress: number;
  imageUrl?: string | null;
  projectTitle: string;
}

export default function ProjectCurrentStatus({
  progress,
  imageUrl,
  projectTitle,
}: ProjectCurrentStatusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  
  // Use framer-motion's useInView for reliable viewport detection across devices
  const isInView = useInView(barRef, { once: false, amount: 0.5 });
  const controls = useAnimation();
  
  // Create a spring value for smooth counting
  const animatedProgress = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 1.5,
  });

  // Transform the spring value to a rounded whole number for display
  const displayProgress = useTransform(animatedProgress, (latest) => Math.round(latest));
  
  // State to force re-render for the text value
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Listen to changes in the transformed value to update our React state
    const unsubscribe = displayProgress.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return () => unsubscribe();
  }, [displayProgress]);

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${progress}%` });
      animatedProgress.set(progress);
    } else {
      // Reset when out of view so it animates again when scrolling back
      controls.set({ width: "0%" });
      animatedProgress.set(0);
    }
  }, [isInView, progress, controls, animatedProgress]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="space-y-6 sm:space-y-8 my-10 sm:my-12"
    >
      <h2 className="font-display text-2xl sm:text-3xl text-navy font-medium uppercase tracking-normal mb-4 sm:mb-6">
        Current Status
      </h2>
      <div className="w-16 h-1 gold-gradient rounded-full mb-6" />

      {imageUrl && (
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-border-light bg-white">
          <Image
            src={imageUrl}
            alt={`${projectTitle} Current Construction Status`}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Progress bar container */}
      <motion.div 
        ref={barRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-3.5 bg-[#D8DCE4] border border-[#BF953F]/10 rounded-2xl p-5 sm:p-6 shadow-sm"
      >
        <div className="flex justify-between items-center text-navy font-sans text-xs sm:text-sm font-bold uppercase tracking-normal">
          <span>Overall Construction Progress</span>
          <span className="gold-gradient-text text-sm sm:text-base">{currentValue}% Work Completed</span>
        </div>
        <div className="w-full h-4 bg-navy/10 rounded-full overflow-hidden border border-navy/5 p-0.5 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={controls}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full gold-gradient shadow-xs"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
