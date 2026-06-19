"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileProjectsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "#" }, // Droplist trigger
    { name: "Awards", href: "/#awards" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-foreground  shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center bg-foreground rounded-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-20  flex items-center justify-center">
            <Image
              src="/daksham developers.png"
              alt="Daksham Developers Logo"
              className="h-full w-auto object-contain"
              height={100}
              width={100}
              loading="eager"
              quality={90}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            if (link.name === "Projects") {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="text-sm font-sans uppercase tracking-wide hover:text-accent transition-colors text-background flex items-center gap-1 cursor-pointer">
                    Projects
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-foreground border border-white/10 rounded-xl shadow-lg py-2 z-50"
                      >
                        <Link
                          href="/projects/ongoing"
                          className="block px-4 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-background hover:text-accent transition-colors"
                        >
                          Ongoing Projects
                        </Link>
                        <Link
                          href="/projects/delivered"
                          className="block px-4 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-background hover:text-accent transition-colors"
                        >
                          Delivered Projects
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-sans uppercase tracking-wide hover:text-accent transition-colors text-background"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-accent cursor-pointer"
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
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col py-6 px-6 gap-4 rounded-2xl"
          >
            {navLinks.map(link => {
              if (link.name === "Projects") {
                return (
                  <div key={link.name} className="flex flex-col border-b border-border pb-2">
                    <button
                      onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                      className="w-full text-left flex justify-between items-center text-lg font-sans font-medium uppercase leading-snug tracking-wide text-foreground hover:text-accent cursor-pointer"
                    >
                      Projects
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform duration-300 ${
                          mobileProjectsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProjectsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col pl-4 gap-3 mt-3"
                        >
                          <Link
                            href="/projects/ongoing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-sans font-semibold uppercase tracking-wider text-slate-500 hover:text-accent"
                          >
                            Ongoing Projects
                          </Link>
                          <Link
                            href="/projects/delivered"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-sans font-semibold uppercase tracking-wider text-slate-500 hover:text-accent"
                          >
                            Delivered Projects
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-sans font-medium uppercase leading-snug tracking-wide text-foreground hover:text-accent border-b border-border pb-2"
                >
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
