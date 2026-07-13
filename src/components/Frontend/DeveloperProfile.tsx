"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL DATA
────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Daksham Developers turned our vision into a landmark project with precision, trust, and world-class execution. Every detail was handled with care.",
    name: "Rumesha Patel",
    role: "Residential Investor",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=420&auto=format&fit=crop",
  },
  {
    quote:
      "Their team delivered exceptional quality and kept communication seamless throughout the entire process. We felt valued at every step.",
    name: "Shilpa Desai",
    role: "Homebuyer",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=420&auto=format&fit=crop",
  },
  {
    quote:
      "Amit Kalra's leadership brings credibility and clarity to every partnership we've built together. A truly reliable developer.",
    name: "Neha Sharma",
    role: "Strategic Partner",
    image:
      "https://images.unsplash.com/photo-1545996124-1aef1b1c6fef?q=80&w=420&auto=format&fit=crop",
  },
];

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
   Uses the site's actual color tokens:
   • bg-onyx / bg-jet-black  (dark background = #0B0C0C / #2A2E34)
   • gold-gradient-text       (shiny multi-stop gold gradient text)
   • text-platinum / text-platinum/70 (light body text)
   • gold-gradient             (button / accent background)
────────────────────────────────────────────────────────────── */
function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div className="flex flex-col h-full p-5 sm:p-7 bg-onyx">
      {/* Large decorative quote mark */}
      <div className="mb-4 gold-gradient-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-11 sm:w-11"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 17H3V9h6v6c0 3-2 5-5 5v-3c1.2 0 2-.8 2-2zm14 0h-4V9h6v6c0 3-2 5-5 5v-3c1.2 0 2-.8 2-2z" />
        </svg>
      </div>

      {/* Quote */}
      <p className="flex-1 text-[13px] sm:text-sm leading-6 sm:leading-7 text-platinum/80 mb-5">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-jet-black mb-5" />

      {/* Profile row */}
      <div className="flex items-center gap-3">
        <div
          className="h-11 w-11 sm:h-13 sm:w-13 overflow-hidden rounded-full flex-shrink-0"
          style={{ boxShadow: "0 0 0 2px var(--bright-gold)" }}
        >
          <img
            src={item.image}
            alt={item.name}
            width={52}
            height={52}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder-project.jpg";
            }}
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-display font-bold gold-gradient-text truncate">
            {item.name}
          </h4>
          <p className="text-[11px] text-platinum/50 uppercase tracking-wider mt-0.5">
            {item.role}
          </p>
        </div>

        {/* Stars pushed right */}
        <div className="ml-auto flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3 text-bright-gold"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.03 8.72c-.783-.57-.38-1.81.588-1.81H6.08a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   DESKTOP MARQUEE  (sm and above)
────────────────────────────────────────────────────────────── */
function DesktopMarquee() {
  const CARD_W = 380;
  const GAP = 20;
  const total = testimonials.length * (CARD_W + GAP);
  const [offset, setOffset] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current)
        setOffset(prev => (prev <= -total ? 0 : prev - 0.55));
    }, 16);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div
      className="relative overflow-hidden hidden sm:block"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Edge fades — using onyx colour to match section bg */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32 bg-gradient-to-r from-onyx to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32 bg-gradient-to-l from-onyx to-transparent" />

      <div
        className="flex"
        style={{ gap: GAP, transform: `translateX(${offset}px)`, willChange: "transform" }}
      >
        {[0, 1].flatMap(g =>
          testimonials.map((item, i) => (
            <motion.div
              key={`${g}-${i}`}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex-shrink-0 overflow-hidden rounded-2xl border border-jet-black shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
              style={{ width: CARD_W, minWidth: CARD_W }}
            >
              <TestimonialCard item={item} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MOBILE SLIDER  (hidden on sm+)
────────────────────────────────────────────────────────────── */
function MobileSlider() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  return (
    <div className="sm:hidden">
      <div className="overflow-hidden rounded-2xl border border-jet-black shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.25 }}
          >
            <TestimonialCard item={testimonials[active]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot + arrow controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 gold-gradient" : "w-1.5 bg-platinum/20"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex items-center justify-center w-8 h-8 rounded-full
                       border border-jet-black text-platinum/50
                       hover:text-platinum hover:border-platinum/30 transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex items-center justify-center w-8 h-8 rounded-full
                       border border-jet-black text-platinum/50
                       hover:text-platinum hover:border-platinum/30 transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────────── */
export default function DeveloperProfile() {
  return (
    <>
      {/* ══════════════ LEADERSHIP SECTION ══════════════ */}
      <section
        id="leadership"
        className="py-20 sm:py-28 lg:py-36 bg-platinum relative z-10"
      >
        <div className="container mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 max-w-7xl">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-navy font-black uppercase tracking-tight leading-[1.1] max-w-4xl mx-auto">
              The Strength Behind Our Landmarks
            </h2>
            <div className="mt-6 w-20 h-1.5 gold-gradient mx-auto rounded-full" />
          </motion.div>

          {/* Profile Card — onyx background, matches site dark card pattern */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-onyx rounded-[2rem] sm:rounded-[3rem] border border-jet-black
                       shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                       px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20
                       relative overflow-hidden group"
          >
            {/* Subtle warm glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-[100px] opacity-20"
              style={{ background: "var(--bright-gold)" }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Photo */}
              <div className="flex justify-center">
                <div
                  className="relative w-56 sm:w-72 md:w-full max-w-[320px]
                               aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl
                               border border-jet-black shadow-2xl
                               transition-transform duration-500 group-hover:-translate-y-3"
                >
                  <Image
                    src="/dakshampp.jpeg"
                    alt="Amit Kalra — Founder, Daksham Developers"
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
                    className="object-cover object-center"
                  />
                  {/* Gold border shine on hover */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-bright-gold/0 group-hover:border-bright-gold/20 transition-all duration-500" />
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <h3 className="gold-gradient-text font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide mb-5">
                  Amit Kalra
                </h3>
                <p className="font-sans text-platinum/75 text-sm sm:text-base leading-7 tracking-normal">
                  Our landmarks are built on a foundation of trust,
                  collaboration, and unmatched expertise — the engineering
                  precision of{" "}
                  <strong className="gold-gradient-text font-bold">
                    Daksham Developers
                  </strong>{" "}
                  and the robust marketing reach of{" "}
                  <strong className="gold-gradient-text font-bold">
                    modern luxury homes
                  </strong>{" "}
                  deliver projects that stand as testaments to quality. Guided
                  by a{" "}
                  <strong className="gold-gradient-text font-bold">
                    customer-centric vision
                  </strong>
                  , our joint ventures ensure uncompromised excellence in every
                  square foot we construct.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS SECTION ══════════════ */}
      <section
        id="testimonials"
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-onyx"
      >
        {/* Warm accent glow — matches brand gold, not blue */}
        <div
          className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full pointer-events-none blur-[140px] opacity-10"
          style={{ background: "var(--bright-gold)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full pointer-events-none blur-[160px] opacity-8"
          style={{ background: "var(--logo-dark)" }}
        />

        <div className="relative z-10 container mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10 sm:mb-12 lg:mb-14"
          >
            {/* Eyebrow pill — gold, not cyan */}
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5
                         text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]
                         gold-gradient-text border border-bright-gold/25 bg-bright-gold/8"
            >
              Testimonials
            </span>

            <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-platinum leading-tight">
              Trusted by Buyers,{" "}
              <span className="block gold-gradient-text">Partners &amp; Investors</span>
            </h3>

            <p className="mt-4 text-sm sm:text-base text-platinum/50 max-w-xl mx-auto leading-7">
              Every successful transaction is built on trust. Here&apos;s what
              our buyers, investors and partners say about working with us.
            </p>
          </motion.div>

          {/* Testimonials — mobile slider / desktop marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <MobileSlider />
            <DesktopMarquee />
          </motion.div>
        </div>
      </section>
    </>
  );
}
