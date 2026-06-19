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
                  <a href="#" className="hover:text-cyan transition-colors" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan transition-colors" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan transition-colors" onClick={(e) => e.preventDefault()}>
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
                <li>
                  <a href="mailto:info@dakshamdevelopers.com" className="hover:text-cyan transition-colors">
                    info@dakshamdevelopers.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919876543210" className="hover:text-cyan transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="mt-4 flex gap-3">
                  {/* Social Icons */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-muted hover:text-cyan transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-muted hover:text-cyan transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-navy-light border border-border-dark hover:border-cyan hover:bg-cyan/10 flex items-center justify-center text-muted hover:text-cyan transition-all"
                    aria-label="X (formerly Twitter)"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
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