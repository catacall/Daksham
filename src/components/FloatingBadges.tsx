"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Bot } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133-.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const whatsappNumber = "919653307030";
const whatsappMessage = encodeURIComponent("Hello Daksham Developers, I am interested in your real estate projects and would like to know more.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const badges = [
  { icon: <Phone size={18} />, href: "tel:+919653307030", bg: "gold-gradient hover:opacity-95 text-navy", glow: "shadow-gold/20", delay: 0.2, name: "Call Us" },
  { icon: <WhatsAppIcon size={20} />, href: whatsappUrl, bg: "bg-[#25D366] hover:bg-[#20b858] text-white", glow: "shadow-emerald-500/20", delay: 0.3, name: "WhatsApp", external: true },
];

export default function FloatingBadges() {
  return (
    <div className="fixed bottom-8 right-5 sm:right-8 flex flex-col items-center gap-3 z-40">
      {badges.map((badge, index) => (
        <div key={index} className="relative group">
          {/* Entry animation wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: badge.delay, duration: 0.4, ease: "easeOut" }}
          >
            {/* Hover animation */}
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            > 
              <Link
                href={badge.href}
                target={badge.external ? "_blank" : undefined}
                rel={badge.external ? "noopener noreferrer" : undefined}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-lg ${badge.bg} ${badge.glow} relative z-10 border border-white/20`}
                aria-label={badge.name}
              >
                {badge.icon}
              </Link>
            </motion.div>
          </motion.div>

          {/* Clean Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-navy text-white text-xs font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none border border-white/10 shadow-lg -translate-x-1 group-hover:translate-x-0">
            {badge.name}
          </div>
        </div>
      ))}
    </div>
  );
}
