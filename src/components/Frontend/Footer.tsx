"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Gold accent line */}
      <div className="h-px bg-gold/30" />

      <footer className="bg-navy text-gold py-10 md:py-16">
        <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 tracking-wider text-gold">
              DAKSHAM
            </h3>
            <p className="text-white leading-relaxed text-base max-w-sm">
              Elevating lifestyles through premium real estate and
              transformative business ventures globally.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-base uppercase text-gold">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-white text-base">
              <li>
                <Link
                  href="/#hero"
                  className="hover:text-[#7AE2CF] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-[#7AE2CF] transition-colors"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/ongoing"
                  className="hover:text-[#7AE2CF] transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-base uppercase text-gold">
              Office Addresses
            </h4>
            <div className="flex flex-col gap-5 text-white text-base leading-relaxed">
              <div>
                <span className="font-bold text-sm uppercase tracking-wider block text-gold mb-1">
                  Corporate Office
                </span>
                <a
                  href="https://maps.google.com/?q=Satra+Plaza,+Sector+19D,+Vashi,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7AE2CF] transition-colors block"
                >
                  806, 8th Floor, Satra Plaza, Sec-19D,
                  <br />
                  19D, Palm Beach Road, Phase -2,
                  <br />
                  Vashi, Navi Mumbai - 400703
                </a>
              </div>
              <div>
                <span className="font-bold text-sm uppercase tracking-wider block text-gold mb-1">
                  Registered Office
                </span>
                <a
                  href="https://maps.google.com/?q=Arenja+Corner,+Sector+17,+Vashi,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7AE2CF] transition-colors block"
                >
                  39, Arenja Corner, Sector-17,
                  <br />
                  Vashi, Navi Mumbai - 400703
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 md:mb-6 tracking-wide text-base uppercase text-gold">
              Contact
            </h4>
            <ul className="flex flex-col gap-4 text-white text-base">
              <li>
                <a
                  href="mailto:info@dakshamdevelopers.com"
                  className="hover:text-[#7AE2CF] transition-colors"
                >
                  info@dakshamdevelopers.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919967556073"
                  className="hover:text-gold transition-colors"
                >
                  +91 99675 56073
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-5 sm:px-6 mt-10 md:mt-16 pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-6 text-white  text-sm">
          <p>&copy; 2026 Daksham Developers. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 text-white">
            <Link
              href="/privacy-policy"
              className="hover:text-[#7AE2CF] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-[#7AE2CF] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
