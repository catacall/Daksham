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
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 border-b rounded-b-2xl ${
        isScrolled || !isHome
          ? "bg-[#0B0C0C]/95 backdrop-blur-md border-white/10 shadow-2xl shadow-black/50"
          : "bg-[#0B0C0C]/90 backdrop-blur-md border-white/10"
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
            <div className="flex items-center h-11 sm:h-14 md:h-16 bg-[#16181D]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-2xl border border-white/15 shadow-lg transition-all duration-300">
              <Image
                src="/daksham developers.webp"
                alt="Daksham Developers Logo"
                height={200}
                width={430}
                loading="eager"
                quality={95}
                priority
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                className="h-full w-auto object-contain scale-105"
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
                          dropdownOpen ? "text-bright-gold" : "text-white/80 hover:text-bright-gold"
                        }`}
                    >
                      Projects
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transform transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180 text-bright-gold" : "text-white/60"
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
                                     bg-[#12151A] border border-white/15 rounded-xl shadow-2xl
                                     py-2 z-50 overflow-hidden"
                        >
                          <Link
                            href="/projects"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-normal text-white/90
                                       hover:text-bright-gold hover:bg-white/5
                                       border-b border-white/10 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-bright-gold shrink-0" />
                            View All Projects
                          </Link>
                          <Link
                            href="/projects/ongoing"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-normal text-white/70
                                       hover:text-bright-gold hover:bg-white/5
                                       border-b border-white/10 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-white/30 shrink-0" />
                            Ongoing Projects
                          </Link>
                          <Link
                            href="/projects/delivered"
                            className="flex items-center gap-3 px-5 py-3 text-[11px] font-sans
                                       font-bold uppercase tracking-normal text-white/70
                                       hover:text-bright-gold hover:bg-white/5 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-white/30 shrink-0" />
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
                          ? "text-bright-gold font-extrabold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                          : "text-white/80 hover:text-bright-gold"
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
                         transition-all duration-200 cursor-pointer whitespace-nowrap shadow-lg shadow-gold/10"
            >
              Enquire Now
            </motion.button>

            {/* Desktop Admin */}
            <Link
              href="/manage"
              title={isAdmin ? "Manage Portal" : "Admin Login"}
              className="hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-sans font-bold uppercase tracking-normal transition-all"
            >
              <LayoutDashboard size={13} className="text-bright-gold" />
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
                          whitespace-nowrap leading-none transition-all duration-200 active:scale-95 shadow-md"
            >
              Enquire
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center
                         w-9 h-9 rounded-lg
                         text-white hover:text-bright-gold
                         hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      </header>

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
              className="fixed top-0 right-0 h-[100dvh] w-[min(85vw,320px)]
                         bg-[#0E1013] border-l border-white/15
                         flex flex-col z-[120] md:hidden shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/15 bg-[#14171C]">
                <div className="flex items-center gap-2">
                  <Image
                    src="/daksham developers.webp"
                    alt="Daksham Developers"
                    width={130}
                    height={60}
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full
                             bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
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
                            px-6 py-4 border-b border-white/10
                            text-xs font-sans font-bold uppercase tracking-wider
                            transition-all cursor-pointer ${
                              mobileProjectsOpen
                                ? "text-bright-gold bg-white/5"
                                : "text-white/80 hover:text-bright-gold hover:bg-white/[0.03]"
                            }`}
                        >
                          <span>Projects</span>
                          <ChevronDown
                            size={14}
                            className={`transform transition-transform duration-300 ${
                              mobileProjectsOpen
                                ? "rotate-180 text-bright-gold"
                                : "text-white/40"
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
                              <div className="flex flex-col border-b border-white/10 bg-white/[0.03]">
                                <Link
                                  href="/projects"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-white/90 hover:text-bright-gold
                                             transition-colors"
                                >
                                  All Projects
                                </Link>
                                <Link
                                  href="/projects/ongoing"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-white/70 hover:text-bright-gold
                                             transition-colors"
                                >
                                  Ongoing Projects
                                </Link>
                                <Link
                                  href="/projects/delivered"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-9 py-3.5 text-xs font-sans font-bold uppercase
                                             tracking-wider text-white/70 hover:text-bright-gold
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
                        className={`block px-6 py-4 border-b border-white/10
                          text-xs font-sans font-bold uppercase tracking-wider
                          transition-all ${
                            isActive(link.href)
                              ? "text-bright-gold bg-white/5"
                              : "text-white/80 hover:text-bright-gold hover:bg-white/[0.03]"
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/10 my-3 mx-4" />

                {/* Admin */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.055, duration: 0.25 }}
                >
                  <Link
                    href="/manage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-6 py-4 border-b border-white/10 text-xs font-sans font-bold uppercase tracking-wider text-white/80 hover:text-bright-gold hover:bg-white/[0.03] transition-colors"
                  >
                    <LayoutDashboard size={13} className="text-bright-gold" />
                    <span>Admin Console</span>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="px-5 pb-8 pt-5 border-t border-white/15 bg-[#14171C] mt-auto">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
                  }}
                  className="w-full py-4 rounded-xl gold-gradient
                             text-navy font-sans text-sm font-bold uppercase tracking-wider
                             transition-all duration-200 active:scale-95 cursor-pointer shadow-lg"
                >
                  Book an Enquiry
                </button>
                <p className="text-center text-white/30 text-[10px] font-sans mt-4 tracking-wider uppercase">
                  Daksham Developers
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
