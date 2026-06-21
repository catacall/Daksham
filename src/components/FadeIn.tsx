"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: ReactNode, 
  delay?: number, 
  className?: string,
  direction?: "up" | "down" | "left" | "right" | "none"
}) {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 30 };
      case "down": return { opacity: 0, y: -30 };
      case "left": return { opacity: 0, x: 30 };
      case "right": return { opacity: 0, x: -30 };
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
