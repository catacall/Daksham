"use client"

import SocialLinks from "./Reuse/SocialLinks";

export default function Footer() {
    return (
      <>
        <footer className="bg-foreground text-background py-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="font-display font-bold text-2xl mb-6 tracking-wider">
                PGRO
              </h3>
              <p className="opacity-70 leading-relaxed text-sm">
                Elevating lifestyles through premium real estate and
                transformative business ventures globally.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 tracking-wide text-sm uppercase">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3 opacity-70 text-sm">
                <li>
                  <a
                    href="#hero"
                    className="hover:text-background transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-background transition-colors"
                  >
                    Who We Are
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-background transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#awards"
                    className="hover:text-background transition-colors"
                  >
                    Awards
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 tracking-wide text-sm uppercase">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 opacity-70 text-sm">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 tracking-wide text-sm uppercase">
                Contact
              </h4>
              <ul className="flex flex-col gap-3 opacity-70 text-sm">
                <li>info@pgro.com</li>
                <li>+1 234 567 8900</li>
                <li className="mt-4 flex gap-4">
                  {/* Minimal Social Icons */}
                  <SocialLinks />
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-sm">
            <p>&copy; 2026 PGRO Group. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
}