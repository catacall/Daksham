"use client";

import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL DATA (Authentic Client & Partner Attributions)
────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "The architectural quality and attention to floor layout at Ce La Vie exceeded our expectations. The team was transparent and proactive throughout the possession process.",
    name: "Rajesh Kulkarni",
    role: "Resident — Ce La Vie, Kharghar",
  },
  {
    quote:
      "Living in Ulwe with proximity to prime transit hubs and thoughtfully designed green amenities made Ganesha Greens an exceptional investment for our family.",
    name: "Sunil & Shilpa Desai",
    role: "Homeowners — Ganesha Greens, Ulwe",
  },
  {
    quote:
      "Mr. Amit Kalra's leadership brings credibility and steadfast execution to every residential and commercial development in Navi Mumbai.",
    name: "Anand Mehta",
    role: "Commercial Partner — United Emporio",
  },
];

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
────────────────────────────────────────────────────────────── */
function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div className="flex flex-col h-full p-6 sm:p-8 bg-onyx">
      {/* Large decorative quote mark */}
      <div className="mb-4 gold-gradient-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 sm:h-10 sm:w-10 opacity-70"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 17H3V9h6v6c0 3-2 5-5 5v-3c1.2 0 2-.8 2-2zm14 0h-4V9h6v6c0 3-2 5-5 5v-3c1.2 0 2-.8 2-2z" />
        </svg>
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm sm:text-base leading-relaxed text-platinum/90 font-sans mb-6">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-5" />

      {/* Profile row */}
      <div className="flex flex-col">
        <h4 className="text-sm sm:text-base font-display font-bold text-white">
          {item.name}
        </h4>
        <p className="text-xs text-bright-gold font-sans uppercase tracking-wider mt-0.5">
          {item.role}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   DESKTOP MARQUEE (sm and above)
   Right-to-Left Continuous Flow in a 3D Radial Curve
────────────────────────────────────────────────────────────── */
function MarqueeCard({ item, i, offset, TOTAL_TRACK, STEP, CARD_WIDTH, containerWidth }: any) {
  const rawX = useTransform(offset, (val: any) => {
    let x = ((i * STEP + val) % TOTAL_TRACK);
    if (x < -CARD_WIDTH) x += TOTAL_TRACK;
    if (x > TOTAL_TRACK - CARD_WIDTH) x -= TOTAL_TRACK;
    return x;
  });

  const normalized = useTransform(rawX, (x: any) => {
    const cardCenter = x + CARD_WIDTH / 2;
    const distFromCenter = cardCenter - (containerWidth / 2);
    return Math.max(-1.4, Math.min(1.4, distFromCenter / (containerWidth * 0.55)));
  });

  const translateY = useTransform(normalized, (n: any) => Math.pow(n, 2) * 36);
  const rotateZ = useTransform(normalized, (n: any) => n * 5.5);
  const rotateY = useTransform(normalized, (n: any) => -n * 14);
  const scale = useTransform(normalized, (n: any) => Math.max(0.88, 1 - Math.abs(n) * 0.08));
  const opacity = useTransform(normalized, (n: any) => Math.max(0.2, 1 - Math.pow(Math.abs(n) / 1.3, 2) * 0.7));
  const zIndex = useTransform(normalized, (n: any) => Math.round(100 - Math.abs(n) * 50));

  return (
    <motion.div
      className="absolute top-4 left-0 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] cursor-pointer"
      style={{
        width: CARD_WIDTH,
        x: rawX,
        y: translateY,
        rotateZ,
        rotateY,
        scale,
        opacity,
        zIndex,
        willChange: "transform, opacity",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      whileHover={{
        scale: 1.04,
        borderColor: "rgba(212, 175, 55, 0.4)",
        boxShadow: "0 20px 50px rgba(212, 175, 55, 0.15)",
      }}
    >
      <TestimonialCard item={item} />
    </motion.div>
  );
}

function DesktopMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Repeat testimonials 4 times for an infinite seamless ribbon
  const repeated = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
  const CARD_WIDTH = 380;
  const CARD_GAP = 24;
  const STEP = CARD_WIDTH + CARD_GAP;
  const TOTAL_TRACK = repeated.length * STEP;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const offset = useMotionValue(0);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    if (isHovered.current) return;
    let next = offset.get() - 0.065 * delta;
    if (next <= -TOTAL_TRACK) next += TOTAL_TRACK;
    offset.set(next);
  });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden hidden sm:block py-12"
      style={{ perspective: "1400px" }}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {/* Edge fades using onyx gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 md:w-36 bg-gradient-to-r from-onyx via-onyx/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-36 bg-gradient-to-l from-onyx via-onyx/80 to-transparent" />

      {/* Radial curve stage */}
      <div className="relative h-[340px] w-full flex items-center justify-center">
        {repeated.map((item, i) => (
          <MarqueeCard
            key={i}
            item={item}
            i={i}
            offset={offset}
            TOTAL_TRACK={TOTAL_TRACK}
            STEP={STEP}
            CARD_WIDTH={CARD_WIDTH}
            containerWidth={containerWidth}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MOBILE SLIDER (hidden on sm+)
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

      {/* Centered navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous"
          className="flex items-center justify-center w-10 h-10 rounded-full
                     bg-transparent border border-bright-gold text-bright-gold
                     hover:bg-bright-gold hover:text-onyx transition-all duration-300 cursor-pointer shadow-md shadow-bright-gold/5"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="flex items-center justify-center w-10 h-10 rounded-full
                     bg-transparent border border-bright-gold text-bright-gold
                     hover:bg-bright-gold hover:text-onyx transition-all duration-300 cursor-pointer shadow-md shadow-bright-gold/5"
        >
          <ChevronRight size={18} />
        </button>
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
        className="py-16 sm:py-24 lg:py-36 bg-[#21252B] relative z-10 border-b border-white/10"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-white font-black uppercase tracking-wide leading-[1.25] max-w-4xl mx-auto drop-shadow-md">
              The Strength Behind Our Landmarks
            </h2>
            <div className="mt-6 w-24 h-1.5 gold-gradient mx-auto rounded-full shadow-lg shadow-bright-gold/20" />
          </motion.div>

          {/* Profile Card — onyx background, matches site dark card pattern */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#111317] rounded-[2rem] sm:rounded-[3rem] border border-white/15
                       shadow-[0_20px_60px_rgba(0,0,0,0.4)]
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
                               border border-white/15 shadow-2xl
                               transition-transform duration-500 group-hover:-translate-y-3"
                >
                  <Image
                    src="/dakshampp.webp"
                    alt="Mr. Amit Kalra — Founder, Daksham Developers"
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
                <h3 className="gold-gradient-text font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.18em] mb-5">
                  Mr. Amit Kalra
                </h3>
                <p className="font-sans text-white/90 text-sm sm:text-base leading-7 tracking-normal">
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
        className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-onyx"
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
                         text-[10px] sm:text-xs font-bold uppercase tracking-normal
                         gold-gradient-text border border-bright-gold/25 bg-bright-gold/8"
            >
              Testimonials
            </span>

            <h3 className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-platinum leading-snug tracking-wide">
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
