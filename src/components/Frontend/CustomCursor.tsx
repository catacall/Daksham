"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    // Move cursor with mouse
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Add hover effect for clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      id="custom-cursor"
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-9999 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ${
        isHovered ? "scale-[2.5] bg-white opacity-100" : "bg-white opacity-80"
      }`}
      style={{ willChange: "transform" }}
    />
  );
}
