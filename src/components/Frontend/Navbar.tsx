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
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 border-b rounded-b-2xl ${
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-sm border-border/40 shadow-sm"
          : "bg-white/95 backdrop-blur-sm border-transparent"
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
            <div className="flex items-center h-11 sm:h-14 md:h-16 bg-white/95 backdrop-blur-xs px-3 sm:px-4 py-1.5 rounded-2xl border border-white/50 shadow-md transition-all duration-300">
              <Image
                src="/daksham developers.webp"
                alt="Daksham Developers Logo"
                height={180}
                width={180}
                loading="eager"
                quality={90}
                priority
                sizes="(max-width: 640px) 72px, (max-width: 768px) 96px, 120px"
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
                        text-[13px] lg:text-sm xl:text-base font-sans font-bold uppercase tracking-normal lg:tracking-normal
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
                                       font-bold uppercase tracking-normal text-navy
                                       hover:bg-off-white
                                       border-b border-border transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-logo shrink-0" />
                            View All Projects
                          </Link>
                          <Link
                            href="/projects/ongoing"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-normal text-navy/70
                                       hover:bg-off-white transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-navy/30 shrink-0" />
                            Ongoing Projects
                          </Link>
                          <Link
                            href="/projects/delivered"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-normal text-navy/70
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
                      text-[13px] lg:text-sm xl:text-base font-sans font-bold uppercase tracking-normal lg:tracking-normal
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
                         uppercase tracking-normal lg:tracking-normal
                         transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Enquire Now
            </motion.button>

            {/* Desktop Admin */}
            <Link
              href="/manage"
              title={isAdmin ? "Manage Portal" : "Admin Login"}
              className="hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-white hover:bg-off-white text-navy text-xs font-sans font-bold uppercase tracking-normal transition-all"
            >
              <LayoutDashboard size={13} className="text-gold" />
              <span>Admin Console</span>
            </Link>

            {/* Mobile Enquire pill */}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-enquiry-modal"))
              }
              className="md:hidden inline-flex items-center justify-center
                          px-3 py-1.5 rounded-lg gold-gradient text-navy
                          text-xs font-sans font-bold uppercase tracking-normal
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
              className="fixed inset-0 bg-black/60 z-[110] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[min(85vw,320px)]
                         bg-white border-l border-border
                         flex flex-col z-[120] md:hidden shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <Image
                    src="/daksham developers.webp"
                    alt="Daksham Developers"
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full
                             bg-navy/5 text-navy/70 hover:bg-navy/10 hover:text-navy transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-3 flex flex-col">
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
                            px-6 py-4 border-b border-border/50
                            text-xs font-sans font-bold uppercase tracking-wider
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
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-navy hover:text-logo
                                             transition-colors"
                                >
                                  All Projects
                                </Link>
                                <Link
                                  href="/projects/ongoing"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-navy/60 hover:text-logo
                                             transition-colors"
                                >
                                  Ongoing Projects
                                </Link>
                                <Link
                                  href="/projects/delivered"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-navy/60 hover:text-logo
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
                        className={`block px-6 py-4 border-b border-border/50
                          text-xs font-sans font-bold uppercase tracking-wider
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
                    className="flex items-center gap-2.5 px-6 py-4 border-b border-border/50 text-xs font-sans font-bold uppercase tracking-wider text-navy hover:text-logo hover:bg-navy/[0.03] transition-colors"
                  >
                    <LayoutDashboard size={13} className="text-[#BF953F]" />
                    <span>Admin Console</span>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="px-5 pb-8 pt-5 border-t border-border mt-auto">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
                  }}
                  className="w-full py-4 rounded-xl gold-gradient
                             text-navy font-sans text-sm font-bold uppercase tracking-wider
                             transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
                >
                  Book an Enquiry
                </button>
                <p className="text-center text-navy/25 text-[10px] font-sans mt-4 tracking-wider uppercase">
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
