"use client"
import Link from "next/link";

export default function Footer() {
    return (
      <>
        {/* Cyan accent line */}
        <div className="h-px bg-linear-to-r from-transparent via-cyan/40 to-transparent" />
        
        <footer className="bg-navy text-white py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-display font-bold text-xl md:text-2xl mb-4 md:mb-6 tracking-wider text-gold-gradient">
                DAKSHAM
              </h3>
              <p className="text-muted leading-relaxed text-sm max-w-xs">
                Elevating lifestyles through premium real estate and
                transformative business ventures globally.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-sm uppercase text-gold">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3 text-muted text-sm">
                <li>
                  <Link
                    href="/#hero"
                    className="hover:text-cyan transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-cyan transition-colors"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/ongoing"
                    className="hover:text-cyan transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#awards"
                    className="hover:text-cyan transition-colors"
                  >
                    Awards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-sm uppercase text-gold">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 text-muted text-sm">
                <li>
                  <a href="#" className="hover:text-cyan transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-sm uppercase text-gold">
                Contact
              </h4>
              <ul className="flex flex-col gap-3 text-muted text-sm">
                <li>info@pgro.com</li>
                <li>+1 234 567 8900</li>
                <li className="mt-4 flex gap-3">
                  {/* Social Icons */}
                  <a href="#" className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-xs text-muted hover:text-cyan transition-all">
                    FB
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-xs text-muted hover:text-cyan transition-all">
                    IN
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-xs text-muted hover:text-cyan transition-all">
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 mt-12 md:mt-16 pt-8 border-t border-border-dark/50 text-center text-muted/50 text-sm">
            <p>&copy; 2026 Daksham Developers. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
}