import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50 py-12 text-neutral-600 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              Daksham Developers
            </span>
            <p className="text-sm leading-relaxed max-w-xs">
              Building trust and delivering excellence in every project we undertake.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-neutral-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects/ongoing" className="hover:text-neutral-900 transition-colors">
                  Ongoing Projects
                </Link>
              </li>
              <li>
                <Link href="/projects/delivered" className="hover:text-neutral-900 transition-colors">
                  Delivered Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <span>
                  Office No. X, Vashi Plaza,<br />
                  Sector 17, Vashi,<br />
                  Navi Mumbai, 400703
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
                <a href="tel:+919876543210" className="hover:text-neutral-900 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
                <a href="mailto:info@dakshamdevelopers.com" className="hover:text-neutral-900 transition-colors">
                  info@dakshamdevelopers.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Daksham Developers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}