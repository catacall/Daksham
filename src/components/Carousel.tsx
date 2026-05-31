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
    <motion.div className="relative container mx-auto px-6">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500 transition-colors"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex-none w-70 md:w-100 snap-center shrink-0">
            <Image
              src={`/SWC-${i}.webp`} // Replace with `/SWC-${i}.webp` if you have 8 different images
              alt={`SWC Page ${i}`}
              className="w-full h-auto object-contain rounded-2xl shadow-xl border border-slate-200 bg-white"
              height={533}
              width={800}
              quality={90}
              priority={i <= 2}
            />
          </div>
        ))}
      </div>

      {/* Optional linear Fades for Carousel edges */}
      <div className="absolute top-0 bottom-0 left-6 w-16 bg-linear-to-r from-slate-50 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-6 w-16 bg-linear-to-l from-slate-50 to-transparent pointer-events-none hidden md:block"></div>

      {/* Mobile Controls */}
      <div className="flex justify-center items-center gap-4 mt-2 md:hidden">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 active:bg-slate-400 transition-colors shadow-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 active:bg-slate-400 transition-colors shadow-sm"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}
