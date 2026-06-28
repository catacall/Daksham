"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Cyan accent line */}
      <div className="h-px bg-cyan/30" />

      <footer className="bg-navy text-white py-10 md:py-16">
        <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display font-bold text-xl md:text-2xl mb-4 md:mb-6 tracking-wider text-gold">
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
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-sm uppercase text-gold">
              Office Addresses
            </h4>
            <div className="flex flex-col gap-4 text-muted text-sm leading-relaxed">
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block text-white/80 mb-1">Corporate Office</span>
                <a 
                  href="https://maps.google.com/?q=Satra+Plaza,+Sector+19D,+Vashi,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan transition-colors block"
                >
                  806, 8th Floor, Satra Plaza, Sec-19D,<br />
                  19D, Palm Beach Road, Phase -2,<br />
                  Vashi, Navi Mumbai - 400703
                </a>
              </div>
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block text-white/80 mb-1">Registered Office</span>
                <a 
                  href="https://maps.google.com/?q=Arenja+Corner,+Sector+17,+Vashi,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan transition-colors block"
                >
                  39, Arenja Corner, Sector-17,<br />
                  Vashi, Navi Mumbai - 400703
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-sm uppercase text-gold">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-muted text-sm">
              <li>
                <a
                  href="mailto:info@dakshamdevelopers.com"
                  className="hover:text-cyan transition-colors"
                >
                  info@dakshamdevelopers.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919967556073"
                  className="hover:text-cyan transition-colors"
                >
                  +91 99675 56073
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-5 sm:px-6 mt-10 md:mt-14 pt-6 border-t border-border-dark/50 flex flex-col md:flex-row justify-between items-center gap-4 text-muted/50 text-xs sm:text-sm">
          <p>&copy; 2026 Daksham Developers. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <Link href="/privacy-policy" className="hover:text-cyan transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-cyan transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
