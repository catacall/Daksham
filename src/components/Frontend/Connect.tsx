"use client";

import { motion } from "framer-motion";

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    hover: "hover:border-cyan hover:text-cyan",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    hover: "hover:border-cyan hover:text-cyan",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    hover: "hover:border-gold hover:text-gold",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    hover: "hover:border-cyan hover:text-cyan",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Connect() {
  return (
    <section id="connect" className="section-padding bg-off-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-medium uppercase leading-snug tracking-wide">
            Connect With Us
          </h2>
          <div className="mt-5 w-90 h-px bg-gold opacity-60" />
        </motion.div>

        {/* Social Icons */}
        <div className="flex flex-wrap gap-4 sm:gap-5">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                y: -4,
                rotate: 5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: i * 0.1,
              }}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 text-navy/70 flex items-center justify-center ${s.hover}`}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
