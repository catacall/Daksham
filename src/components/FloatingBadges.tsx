"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Bot } from "lucide-react";
import Link from "next/link";

export default function FloatingBadges() {
  const badges = [
    { icon: <MessageCircle size={20} />, href: "https://wa.me/1234567890", color: "bg-green-500 hover:bg-green-400", delay: 0.1, name: "WhatsApp" },
    { icon: <Mail size={20} />, href: "mailto:contact@paradisegroup.com", color: "bg-cyan hover:bg-cyan-dark", delay: 0.2, name: "Email" },
    { icon: <Phone size={20} />, href: "tel:+1234567890", color: "bg-gold hover:bg-gold-light", delay: 0.3, name: "Phone" },
    { icon: <Bot size={20} />, href: "#chatbot", color: "bg-navy hover:bg-navy-light", delay: 0.4, name: "Chatbot" },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-3 sm:gap-4 z-50">
      {badges.map((badge, index) => (
        <div key={index} className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: badge.delay, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href={badge.href}
              onClick={(e) => {
                if (badge.href === "#chatbot") {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-chatbot"));
                }
              }}
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg ${badge.color} relative z-10 transition-colors border border-white/10`}
            >
              {badge.icon}
            </Link>
            
            {/* Pulse effect */}
            <span className={`absolute top-0 left-0 w-full h-full rounded-full ${badge.color.split(' ')[0]} opacity-40 animate-ping -z-10`} />
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 sm:mr-4 px-3 py-1.5 bg-navy text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border-dark shadow-lg">
            {badge.name}
          </div>
        </div>
      ))}
    </div>
  );
}
