"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Daksham Developers
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/projects/ongoing" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Ongoing Projects
          </Link>
          <Link href="/projects/delivered" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Delivered Projects
          </Link>
          <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4 shadow-lg">
          <Link
            href="/projects/ongoing"
            className="block text-base font-medium text-neutral-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ongoing Projects
          </Link>
          <Link
            href="/projects/delivered"
            className="block text-base font-medium text-neutral-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Delivered Projects
          </Link>
          <Link
            href="/contact"
            className="block text-base font-medium text-neutral-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
