"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" }, // One of the drop menus in wireframe, simplified here
    { name: "Awards", href: "/#awards" },
    { name: "Contact", href: "/#contact" },
    { name: "Alliance", href: "/#alliance" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-foreground backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className=" container mx-auto px-6 flex justify-between items-center  ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="PGRO Logo"
              className="h-full w-auto object-contain"
              height={100}
              width={200}
              quality={95}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-sans uppercase tracking-wide hover:text-accent transition-colors text-background"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-accent "
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col py-6 px-6 gap-4 rounded-2xl "
          >
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-sans font-medium uppercase leading-snug tracking-wide text-foreground hover:text-accent border-b border-border pb-2 "
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
