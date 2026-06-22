"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    startTransition(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
      setMobileProjectsOpen(false);
    });
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Check if a Payload admin is logged in
  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "#" }, // Dropdown trigger
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 pt-1 ${
        isScrolled || !isHome ? "py-2 md:py-3" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center bg-navy rounded-2xl border border-border-dark">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-16 sm:h-18 md:h-20 flex items-center justify-center ">
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => {
            if (link.name === "Projects") {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="text-xs lg:text-sm font-sans uppercase tracking-wide hover:text-cyan transition-colors text-white/90 flex items-center gap-1 cursor-pointer">
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
                        className="absolute top-full left-0 mt-2 w-52 glass rounded-xl shadow-xl py-2 z-50"
                      >
                        <Link
                          href="/projects/ongoing"
                          className="block px-5 py-3 text-xs font-sans font-bold uppercase tracking-wider text-white/80 hover:text-cyan hover:bg-white/5 transition-all"
                        >
                          Ongoing Projects
                        </Link>
                        <Link
                          href="/projects/delivered"
                          className="block px-5 py-3 text-xs font-sans font-bold uppercase tracking-wider text-white/80 hover:text-cyan hover:bg-white/5 transition-all"
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
                className="text-xs lg:text-sm font-sans uppercase tracking-wide hover:text-cyan transition-colors text-white/90"
              >
                {link.name}
              </Link>
            );
          })}

          {/* Admin access — subtle icon always present; prominent pill when logged in */}
          <Link
            href="/manage"
            title={isAdmin ? "Manage Portal" : "Admin Login"}
            className={
              isAdmin
                ? "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/60 text-gold text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200"
                : "flex items-center justify-center w-7 h-7 rounded-md text-white/20 hover:text-white/60 hover:bg-white/5 transition-all duration-200"
            }
          >
            <LayoutDashboard size={isAdmin ? 13 : 14} />
            {isAdmin && <span>Manage</span>}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gold cursor-pointer p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav — Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-full bg-navy md:hidden flex flex-col z-60"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gold cursor-pointer p-2"
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => {
                if (link.name === "Projects") {
                  return (
                    <div key={link.name} className="flex flex-col border-b border-border-dark/50 pb-4">
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                        className="w-full text-left flex justify-between items-center text-2xl font-display font-medium uppercase leading-snug tracking-wider text-white hover:text-cyan cursor-pointer py-4"
                      >
                        Projects
                        <ChevronDown
                          size={22}
                          className={`transform transition-transform duration-300 text-gold ${
                            mobileProjectsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>
                      <AnimatePresence>
                        {mobileProjectsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 gap-4 pb-2"
                          >
                            <Link
                              href="/projects/ongoing"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-lg font-sans font-semibold uppercase tracking-wider text-muted hover:text-cyan transition-colors"
                            >
                              Ongoing Projects
                            </Link>
                            <Link
                              href="/projects/delivered"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-lg font-sans font-semibold uppercase tracking-wider text-muted hover:text-cyan transition-colors"
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
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-2xl font-display font-medium uppercase leading-snug tracking-wider text-white hover:text-cyan border-b border-border-dark/50 py-4 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile admin link — always present */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Link
                  href="/manage"
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isAdmin
                      ? "flex items-center gap-2 text-gold border-b border-border-dark/50 py-4 font-display text-2xl font-medium uppercase tracking-wider hover:text-gold-light transition-colors"
                      : "flex items-center gap-2 text-white/20 hover:text-white/40 border-b border-border-dark/20 py-4 font-sans text-sm uppercase tracking-wider transition-colors"
                  }
                >
                  <LayoutDashboard size={isAdmin ? 22 : 16} />
                  {isAdmin ? "Manage Portal" : "Admin Login"}
                </Link>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="px-8 pb-8">
              <div className="h-px bg-cyan/20" />
              <p className="text-center text-muted/60 text-xs font-sans mt-4 tracking-wider uppercase">
                Daksham Developers
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
