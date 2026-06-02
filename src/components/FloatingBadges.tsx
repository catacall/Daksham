"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Bot } from "lucide-react";
import Link from "next/link";

export default function FloatingBadges() {
  const badges = [
    { icon: <MessageCircle size={24} />, href: "https://wa.me/1234567890", color: "bg-green-500", delay: 0.1, name: "WhatsApp" },
    { icon: <Mail size={24} />, href: "mailto:contact@paradisegroup.com", color: "bg-blue-500", delay: 0.2, name: "Email" },
    { icon: <Phone size={24} />, href: "tel:+1234567890", color: "bg-accent", delay: 0.3, name: "Phone" },
    { icon: <Bot size={24} />, href: "#chatbot", color: "bg-foreground", delay: 0.4, name: "Chatbot" },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
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
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ${badge.color} relative z-10`}
            >
              {badge.icon}
            </Link>
            
            {/* Pulse effect */}
            <span className={`absolute top-0 left-0 w-full h-full rounded-full ${badge.color} opacity-50 animate-ping -z-10`} />
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1 bg-foreground text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {badge.name}
          </div>
        </div>
      ))}
    </div>
  );
}
