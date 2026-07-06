"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Gold accent line */}
      <div className="h-px gold-gradient " />

      <footer className="bg-[#0a0a0a] py-10 md:py-16">
        <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 tracking-wider gold-gradient-text">
              DAKSHAM
            </h3>
            <p className="text-white leading-loose tracking-wide text-lg font-sans max-w-sm">
              Elevating lifestyles through premium real estate and
              transformative business ventures globally.
            </p>
          </div>
          <div>
            <h4 className="font-bold font-sans mb-4 md:mb-6 tracking-widest text-lg uppercase gold-gradient-text">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-5 text-white text-lg font-sans tracking-wide leading-loose">
              <li>
                <Link
                  href="/#hero"
                  className="hover:gold-gradient-text transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:gold-gradient-text transition-colors"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/ongoing"
                  className="hover:gold-gradient-text transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold font-sans mb-4 md:mb-6 tracking-widest text-lg uppercase gold-gradient-text">
              Office Addresses
            </h4>
            <div className="flex flex-col gap-5 text-white text-lg font-sans tracking-wide leading-loose">
              <div>
                <span className="font-bold font-sans text-base uppercase tracking-widest block gold-gradient-text mb-2">
                  Corporate Office
                </span>
                <a
                  href="https://maps.google.com/?q=Satra+Plaza,+Sector+19D,+Vashi,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:gold-gradient-text transition-colors block"
                >
                  806, 8th Floor, Satra Plaza, Sec-19D,
                  <br />
                  19D, Palm Beach Road, Phase -2,
                  <br />
                  Vashi, Navi Mumbai - 400703
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold font-sans mb-4 md:mb-6 tracking-widest text-lg uppercase gold-gradient-text">
              Contact
            </h4>
            <ul className="flex flex-col gap-5 text-white text-lg font-sans tracking-wide leading-loose">
              <li>
                <a
                  href="mailto:dashanzidevelopers@gmail.com"
                  className="hover:gold-gradient-text transition-colors"
                >
                  dashanzidevelopers@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919653307030"
                  className="hover:gold-gradient-text transition-colors"
                >
                  +91 96533 07030
                </a>
              </li>
              <li>
                <a
                  href="tel:+919653313244"
                  className="hover:gold-gradient-text transition-colors"
                >
                  +91 96533 13244
                </a>
              </li>
              <li>
                <a
                  href="tel:02246099724"
                  className="hover:gold-gradient-text transition-colors"
                >
                  022 - 4609 9724
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-5 sm:px-6 mt-10 md:mt-16 pt-8 border-t border-transparent/20 flex flex-col md:flex-row justify-between items-center gap-6 text-white text-base font-sans tracking-wide">
          <p>&copy; 2026 Daksham Developers. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 text-white">
            <Link
              href="/privacy-policy"
              className="hover:gold-gradient-text transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:gold-gradient-text transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
