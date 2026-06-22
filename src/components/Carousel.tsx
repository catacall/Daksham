"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const [liveSlides, setLiveSlides] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    fetch("/api/projects?limit=20&depth=1&sort=-publishedAt")
      .then(res => res.json())
      .then(data => {
        if (data && data.docs && data.docs.length > 0) {
          const items: { src: string; alt: string }[] = [];
          data.docs.forEach((p: any) => {
            const url = typeof p.coverImage === "object" && p.coverImage !== null ? p.coverImage.url : null;
            if (url) {
              items.push({
                src: url,
                alt: p.title || "Project Image",
              });
            }
          });
          if (items.length > 0) {
            setLiveSlides(items);
          }
        }
      })
      .catch(() => {});
  }, []);

  const displaySlides = liveSlides.length > 0 ? liveSlides : [
    { src: "/placeholder-project.jpg", alt: "Daksham Project" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        const slideWidth = firstChild ? firstChild.clientWidth : (clientWidth > 768 ? 416 : 288);
        const gap = clientWidth > 640 ? 24 : 16;
        
        const currentSlide = Math.round(scrollLeft / (slideWidth + gap));
        setActiveIndex(Math.min(Math.max(currentSlide, 0), displaySlides.length - 1));
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [displaySlides.length]);

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
        {displaySlides.map((slide, i) => (
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
        {isHovering && displaySlides.length > 1 && (
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
      {displaySlides.length > 1 && (
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
      )}

      {/* Pagination Dots */}
      {displaySlides.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {displaySlides.map((_, idx) => (
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
      )}
    </div>
  );
}
