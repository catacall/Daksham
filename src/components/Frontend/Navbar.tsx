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
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace("#", ""));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
        isScrolled || !isHome ? "bg-white border-border shadow-sm py-0" : "bg-transparent border-transparent py-2 md:py-4"
      }`}
    >
      {/* ══════════════════════ NAV BAR ══════════════════════ */}
      <div className="w-full px-6 sm:px-12 lg:px-20">
        <div
          className="relative flex items-center justify-between h-16 sm:h-20 md:h-24"
        >
          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            className="flex items-center shrink-0 z-10"
            aria-label="Daksham Developers Home"
          >
            <div
              className={`flex items-center transition-all duration-300 ${
                isScrolled || !isHome ? "h-12 sm:h-14 md:h-16" : "h-14 sm:h-16 md:h-20"
              }`}
            >
              <Image
                src="/daksham developers.png"
                alt="Daksham Developers Logo"
                className="h-full w-auto object-contain"
                height={120}
                width={120}
                loading="eager"
                quality={100}
                priority
              />
            </div>
          </Link>

          {/* ── CENTRE: Desktop nav links ── */}
          <nav
            className="hidden md:flex flex-1 justify-center px-4
                       items-center gap-2 lg:gap-6"
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
                      className={`flex items-center gap-1 px-3 lg:px-4 py-2
                        text-xs font-sans font-bold uppercase tracking-[0.15em]
                        transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          (isScrolled || !isHome)
                            ? (dropdownOpen ? "text-logo" : "text-navy hover:text-logo")
                            : (dropdownOpen ? "text-logo" : "text-navy hover:text-logo")
                        }`}
                    >
                      Projects
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transform transition-transform duration-300 ${
                          dropdownOpen
                            ? "rotate-180 text-logo"
                            : "text-navy/40"
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
                          className="absolute top-full left-0 mt-2 w-56
                                     structural-panel shadow-xl
                                     py-2 z-50 overflow-hidden"
                        >
                          <Link
                            href="/projects"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy
                                       hover:text-logo hover:bg-off-white
                                       border-b border-border transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-logo shrink-0" />
                            View All Projects
                          </Link>
                          <Link
                            href="/projects/ongoing"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy/70
                                       hover:text-logo hover:bg-off-white transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-navy/30 shrink-0" />
                            Ongoing Projects
                          </Link>
                          <Link
                            href="/projects/delivered"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-widest text-navy/70
                                       hover:text-logo hover:bg-off-white transition-all"
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
                    className={`flex items-center justify-center px-3 lg:px-4 py-2
                      text-xs font-sans font-bold uppercase tracking-[0.15em]
                      transition-all duration-200 whitespace-nowrap ${
                        isActive(link.href)
                          ? "text-logo"
                          : ((isScrolled || !isHome) ? "text-navy hover:text-logo" : "text-navy hover:text-logo")
                      }`}
                  >
                    {link.name}
                  </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: CTA + Admin (desktop) / Enquire + Hamburger (mobile) ── */}
          <div className="flex items-center justify-end gap-2 z-10">
            {/* Desktop CTA */}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="hidden md:inline-flex items-center gap-1.5
                         px-6 py-3 bg-navy hover:bg-logo text-white
                         text-[11px] font-sans font-bold
                         uppercase tracking-[0.15em]
                         transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ minHeight: "unset" }}
            >
              Enquire Now
            </button>

            {/* Desktop Admin */}
            <Link
              href="/manage"
              title={isAdmin ? "Manage Portal" : "Admin Login"}
              className={`hidden md:flex items-center justify-center transition-all duration-200 ${
                isAdmin
                  ? "gap-1.5 px-3 py-1.5 rounded-lg bg-logo hover:bg-logo-light text-navy text-xs font-sans font-bold uppercase tracking-wider"
                  : "w-8 h-8 rounded-md bg-logo hover:bg-logo-light text-navy"
              }`}
              style={{ minHeight: "unset" }}
            >
              <LayoutDashboard size={isAdmin ? 13 : 14} />
              {isAdmin && <span>Manage</span>}
            </Link>

            {/* Mobile Enquire pill */}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="md:hidden text-logo border border-logo/40 bg-logo/10
                          px-3 py-1.5
                         text-[10px] font-sans font-bold uppercase tracking-wider
                         whitespace-nowrap leading-none"
              style={{ minHeight: "unset" }}
            >
              Enquire
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center
                         w-9 h-9 rounded-lg
                         text-black hover:text-accent
                         hover:bg-white/8 transition-colors cursor-pointer"
              style={{ minHeight: "unset" }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={22} />
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-59 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[min(82vw,320px)]
                         bg-white border-l border-border
                         flex flex-col z-60 md:hidden shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                
                  
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8
                             text-navy/60 hover:text-logo hover:bg-navy/5 transition-colors"
                  style={{ minHeight: "unset" }}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  if (link.name === "Projects") {
                    return (
                      <div key={link.name}>
                        <motion.button
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.28 }}
                          onClick={() => setMobileProjectsOpen(prev => !prev)}
                          className={`w-full flex items-center justify-between
                            px-6 py-4 border-b border-border-light
                            text-xs font-sans font-bold uppercase tracking-[0.15em]
                            transition-all cursor-pointer ${
                              mobileProjectsOpen
                                ? "text-logo bg-navy/5"
                                : "text-navy hover:text-logo hover:bg-navy/5"
                            }`}
                          style={{ minHeight: "unset" }}
                        >
                          <span>Projects</span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-300 ${
                              mobileProjectsOpen
                                ? "rotate-180 text-logo"
                                : "text-navy/30"
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
                              <div className="flex flex-col pl-6 py-2 gap-1 border-b border-border-light bg-navy/5">
                                <Link
                                  href="/projects"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-4 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-logo hover:text-logo-light
                                             transition-colors"
                                >
                                  All Projects
                                </Link>
                                <Link
                                  href="/projects/ongoing"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-4 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-navy/70 hover:text-logo
                                             transition-colors"
                                >
                                  Ongoing Projects
                                </Link>
                                <Link
                                  href="/projects/delivered"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-4 py-3 text-[11px] font-sans font-bold uppercase
                                             tracking-[0.15em] text-navy/70 hover:text-logo
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.28 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-6 py-4 border-b border-border-light
                          text-xs font-sans font-bold uppercase tracking-[0.15em]
                          transition-all ${
                            isActive(link.href)
                              ? "text-logo bg-navy/5"
                              : "text-navy hover:text-logo hover:bg-navy/5"
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/8 my-2 mx-1" />

                {/* Admin */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.28 }}
                >
                  <Link
                    href="/manage"
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      isAdmin
                        ? "flex items-center gap-2 px-4 py-3.5 rounded-xl text-logo hover:text-logo-light hover:bg-white/5 font-display text-sm font-medium uppercase tracking-wider transition-colors"
                        : "flex items-center gap-2 px-4 py-3 rounded-xl text-white/20 hover:text-white/45 hover:bg-white/5 font-sans text-xs uppercase tracking-wider transition-colors"
                    }
                    style={{ minHeight: "unset" }}
                  >
                    <LayoutDashboard size={isAdmin ? 16 : 13} />
                    {isAdmin ? "Manage Portal" : "Admin Login"}
                  </Link>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="px-6 pb-8 pt-6 border-t border-border mt-auto">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
                  }}
                  className="w-full py-4 bg-navy hover:bg-logo
                             text-white font-sans text-xs font-bold uppercase tracking-[0.15em]
                             transition-all duration-200 active:scale-95 cursor-pointer"
                  style={{ minHeight: "unset" }}
                >
                  Book an Enquiry
                </button>
                <p
                  className="text-center text-white/20 text-[9px] font-sans mt-3
                              tracking-[0.25em] uppercase"
                >
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
