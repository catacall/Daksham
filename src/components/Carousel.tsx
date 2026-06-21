"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", alt: "Sai World City — Luxury Towers" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", alt: "Sai World Empire — Neo-Classical Residences" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", alt: "Sai World Legend — Premium Towers" },
  { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80", alt: "Paradise Mall — Highstreet Retail" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", alt: "Sai World Dreams — Mixed-Use Hub" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", alt: "Luxury Residences — Panoramic Views" },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", alt: "Premium Apartments — Modern Architecture" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80", alt: "Grand Lobby — Five-Star Amenities" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        // The width of each slide varies by breakpoint, but we can approximate it by looking at the first child
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        const slideWidth = firstChild ? firstChild.clientWidth : (clientWidth > 768 ? 416 : 288);
        const gap = clientWidth > 640 ? 24 : 16; // sm:gap-6 (24px) or gap-4 (16px)
        
        const currentSlide = Math.round(scrollLeft / (slideWidth + gap));
        setActiveIndex(Math.min(Math.max(currentSlide, 0), slides.length - 1));
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 400 : 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToSlide = (index: number) => {
    if (scrollRef.current) {
      // Very rough approximation for snap scrolling
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 400 : 340;
      scrollRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div 
      className="relative container mx-auto px-4 sm:px-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        ref={scrollRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-8 pt-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-navy/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gold transition-colors"
      >
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            variants={slideVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(11,22,40,0.18)" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex-none w-60 sm:w-72 md:w-104 snap-center shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-border-light bg-white shadow-md cursor-pointer"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className="w-full h-auto object-contain"
              height={533}
              width={800}
              quality={90}
              priority={i <= 2}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div className="absolute top-0 bottom-6 left-4 sm:left-6 w-12 sm:w-20 bg-linear-to-r from-off-white to-transparent pointer-events-none hidden md:block z-10" />
      <div className="absolute top-0 bottom-6 right-4 sm:right-6 w-12 sm:w-20 bg-linear-to-l from-off-white to-transparent pointer-events-none hidden md:block z-10" />

      {/* Desktop Navigation Arrows */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => scroll("left")}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-white/90 text-navy shadow-xl border border-border-light hover:bg-gold hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={28} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scroll("right")}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-white/90 text-navy shadow-xl border border-border-light hover:bg-gold hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={28} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Controls */}
      <div className="flex justify-center items-center gap-4 mt-2 md:hidden">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scroll("left")}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-navy text-white shadow-sm border border-border-dark cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scroll("right")}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-navy text-white shadow-sm border border-border-dark cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === idx 
                ? "w-8 h-2 bg-gold" 
                : "w-2 h-2 bg-navy/20 hover:bg-navy/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
