"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // rough width of one slide + gap
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div className="relative container mx-auto px-4 sm:px-6">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-8 pt-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-navy/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-navy/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan/50 transition-colors"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex-none w-60 sm:w-70 md:w-105 snap-center shrink-0">
            <Image
              src={`/SWC-${i}.webp`}
              alt={`SWC Page ${i}`}
              className="w-full h-auto object-contain rounded-xl sm:rounded-2xl shadow-xl border border-border-light bg-white"
              height={533}
              width={800}
              quality={90}
              priority={i <= 2}
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-12 sm:w-16 bg-linear-to-r from-off-white to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-4 sm:right-6 w-12 sm:w-16 bg-linear-to-l from-off-white to-transparent pointer-events-none hidden md:block"></div>

      {/* Mobile Controls */}
      <div className="flex justify-center items-center gap-4 mt-2 md:hidden">
        <button
          onClick={() => scroll("left")}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-navy text-white hover:bg-navy-light active:bg-cyan/20 transition-colors shadow-sm border border-border-dark"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-navy text-white hover:bg-navy-light active:bg-cyan/20 transition-colors shadow-sm border border-border-dark"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </motion.div>
  );
}
