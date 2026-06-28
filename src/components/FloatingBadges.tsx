"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Bot } from "lucide-react";
import Link from "next/link";

const badges = [
  { icon: <Mail size={20} />, href: "mailto:info@dakshamdevelopers.com", bg: "bg-navy-light", glow: "shadow-navy-light/30", delay: 0.2, name: "Email" },
  { icon: <Phone size={20} />, href: "tel:+919967556073", bg: "bg-gold", glow: "shadow-gold/30", delay: 0.3, name: "Call Us" },
  { icon: <Bot size={20} />, href: "#chatbot", bg: "bg-navy", glow: "shadow-navy/30", delay: 0.4, name: "Chatbot" },
];

export default function FloatingBadges() {
  return (
    <div className="fixed bottom-24 sm:bottom-28 right-7.5 sm:right-9 flex flex-col items-center gap-3 sm:gap-4 z-50">
      {badges.map((badge, index) => (
        <div key={index} className="relative group">
          {/* Entry animation wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: badge.delay, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Hover animation on the button itself */}
            <motion.div
              whileHover={{ scale: 1.14, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            > 
              <Link
                href={badge.href}
                onClick={(e) => {
                  if (badge.href === "#chatbot") {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-chatbot"));
                  }
                }}
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg ${badge.bg} ${badge.glow} shadow-md relative z-10 border border-white/15`}
                aria-label={badge.name}
              >
                {badge.icon}
              </Link>
            </motion.div>
          </motion.div>

          {/* Ping pulse */}
          <span className={`absolute top-0 left-0 w-full h-full rounded-full ${badge.bg} opacity-35 animate-ping -z-10 pointer-events-none`} />

          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-navy text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none border border-border-dark shadow-lg -translate-x-1 group-hover:translate-x-0">
            {badge.name}
          </div>
        </div>
      ))}
    </div>
  );
}
