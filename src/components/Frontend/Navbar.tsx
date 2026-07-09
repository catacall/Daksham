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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
      setMobileProjectsOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.user) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "#" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace("#", ""));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b rounded-b-2xl ${
        isScrolled || !isHome
          ? "bg-platinum border-border shadow-sm"
          : "bg-platinum border-transparent"
      }`}
    >
      {/* ══════════════════════ NAV BAR ══════════════════════ */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="relative flex items-center justify-between h-14 sm:h-18 md:h-20 lg:h-22">

          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            className="flex items-center shrink-0 z-10"
            aria-label="Daksham Developers Home"
          >
            <div className="flex items-center h-14 sm:h-16 md:h-20 transition-all duration-300">
              <Image
                src="/daksham developers.png"
                alt="Daksham Developers Logo"
                height={180}
                width={180}
                loading="eager"
                quality={100}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* ── CENTRE: Desktop nav links ── */}
          <nav
            className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-2 xl:gap-4"
            aria-label="Main navigation"
          >
            {navLinks.map(link => {
              if (link.name === "Projects") {
                return (
                  <div
                    key={link.name}
                    className="relative flex items-center"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 lg:px-4 xl:px-5 py-2.5
                        text-[13px] lg:text-sm xl:text-base font-sans font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em]
                        transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          dropdownOpen ? "text-navy" : "text-navy/70 hover:text-navy"
                        }`}
                    >
                      Projects
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transform transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180 text-navy" : "text-navy/80"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-2 w-52
                                     structural-panel shadow-xl
                                     py-2 z-50 overflow-hidden"
                        >
                          <Link
                            href="/projects"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy
                                       hover:bg-off-white
                                       border-b border-border transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-logo shrink-0" />
                            View All Projects
                          </Link>
                          <Link
                            href="/projects/ongoing"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy/70
                                       hover:bg-off-white transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-navy/30 shrink-0" />
                            Ongoing Projects
                          </Link>
                          <Link
                            href="/projects/delivered"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy/70
                                       hover:bg-off-white transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-navy/30 shrink-0" />
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
                  className={`flex items-center justify-center px-3 lg:px-4 xl:px-5 py-2.5
                      text-[13px] lg:text-sm xl:text-base font-sans font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em]
                      transition-all duration-200 whitespace-nowrap ${
                        isActive(link.href)
                          ? "text-navy"
                          : "text-navy/70 hover:text-navy"
                      }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: CTA + Admin (desktop) / Enquire + Hamburger (mobile) ── */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 z-10">

            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="hidden md:inline-flex items-center gap-1.5
                         px-5 lg:px-7 py-2.5 lg:py-3 rounded-xl gold-gradient hover:opacity-90
                         text-navy text-sm lg:text-base font-sans font-bold
                         uppercase tracking-[0.15em] lg:tracking-[0.2em]
                         transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Enquire Now
            </motion.button>

            {/* Desktop Admin */}
            <Link
              href="/manage"
              title={isAdmin ? "Manage Portal" : "Admin Login"}
              className={`hidden md:flex items-center justify-center transition-all duration-200 ${
                isAdmin
                  ? "gap-1.5 px-3 py-1.5 rounded-lg bg-logo hover:bg-logo-light text-navy text-xs font-sans font-bold uppercase tracking-wider"
                  : "w-8 h-8 rounded-md bg-logo hover:bg-logo-light text-navy"
              }`}
            >
              <LayoutDashboard size={isAdmin ? 13 : 14} />
              {isAdmin && <span>Manage</span>}
            </Link>

            {/* Mobile Enquire pill */}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="md:hidden inline-flex items-center justify-center
                          px-3 py-1.5 rounded-lg gold-gradient text-navy
                          text-xs font-sans font-bold uppercase tracking-[0.12em]
                          whitespace-nowrap leading-none transition-all duration-200 active:scale-95"
            >
              Enquire
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center
                         w-8 h-8 rounded-lg
                         text-navy hover:text-navy/60
                         hover:bg-navy/5 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MOBILE SLIDE PANEL ══════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-[59] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[min(80vw,300px)]
                         bg-white border-l border-border
                         flex flex-col z-[60] md:hidden shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Image
                    src="/daksham developers.png"
                    alt="Daksham Developers"
                    width={80}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg
                             text-navy/60 hover:bg-navy/5 transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-2 flex flex-col">
                {navLinks.map((link, i) => {
                  if (link.name === "Projects") {
                    return (
                      <div key={link.name}>
                        <motion.button
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.055, duration: 0.25 }}
                          onClick={() => setMobileProjectsOpen(prev => !prev)}
                          className={`w-full flex items-center justify-between
                            px-5 py-3.5 border-b border-border/50
                            text-[11px] font-sans font-bold uppercase tracking-[0.15em]
                            transition-all cursor-pointer ${
                              mobileProjectsOpen
                                ? "gold-gradient-text bg-navy/5"
                                : "text-navy hover:text-navy/60 hover:bg-navy/[0.03]"
                            }`}
                        >
                          <span>Projects</span>
                          <ChevronDown
                            size={14}
                            className={`transform transition-transform duration-300 ${
                              mobileProjectsOpen
                                ? "rotate-180 text-logo"
                                : "text-navy/40"
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {mobileProjectsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col border-b border-border/50 bg-navy/[0.03]">
                                <Link
                                  href="/projects"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-8 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-navy hover:text-logo
                                             transition-colors"
                                >
                                  All Projects
                                </Link>
                                <Link
                                  href="/projects/ongoing"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-8 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-navy/60 hover:text-logo
                                             transition-colors"
                                >
                                  Ongoing Projects
                                </Link>
                                <Link
                                  href="/projects/delivered"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-8 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-navy/60 hover:text-logo
                                             transition-colors"
                                >
                                  Delivered Projects
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-5 py-3.5 border-b border-border/50
                          text-[11px] font-sans font-bold uppercase tracking-[0.15em]
                          transition-all ${
                            isActive(link.href)
                              ? "gold-gradient-text bg-navy/5"
                              : "text-navy hover:text-navy/60 hover:bg-navy/[0.03]"
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}



                <div className="h-px bg-navy/10 my-3 mx-4" />

                {/* Admin */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.055, duration: 0.25 }}
                >
                  <Link
                    href="/manage"
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      isAdmin
                        ? "flex items-center gap-2 px-5 py-3 text-[11px] font-sans font-bold uppercase tracking-wider text-navy hover:text-logo transition-colors"
                        : "flex items-center gap-2 px-5 py-3 text-[11px] font-sans font-bold uppercase tracking-wider text-navy/30 hover:text-navy/50 transition-colors"
                    }
                  >
                    <LayoutDashboard size={isAdmin ? 14 : 12} />
                    {isAdmin ? "Manage Portal" : "Admin Login"}
                  </Link>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="px-5 pb-6 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
                  }}
                  className="w-full py-4 rounded-xl gold-gradient
                             text-navy font-sans text-sm font-bold uppercase tracking-[0.15em]
                             transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  Book an Enquiry
                </button>
                <p className="text-center text-navy/25 text-[9px] font-sans mt-3 tracking-[0.2em] uppercase">
                  Daksham Developers
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
