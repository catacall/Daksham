// Shown for URLs that match no route at all. This app has several root
// layouts ((app), (payload), (manage)), so Next.js needs this file to render a
// branded 404 for unmatched URLs. It must return a full HTML document.
import "./(app)/globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import type { Metadata } from "next";

const europaGrotesk = localFont({
  src: "../../public/EuropaGroteskSH-Med.otf",
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page Not Found | Daksham Developers",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${europaGrotesk.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="bg-off-white min-h-screen px-5 flex items-center justify-center">
          <div className="max-w-lg w-full text-center space-y-6">
            <p className="font-display text-7xl sm:text-8xl font-medium text-[#8A6A12] leading-none">
              404
            </p>
            <h1 className="font-display text-2xl sm:text-3xl uppercase text-navy">
              Page Not Found
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
              The page you are looking for does not exist or may have been
              moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white text-xs font-sans font-bold uppercase tracking-normal"
              >
                View Projects
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border-light text-navy text-xs font-sans font-bold uppercase tracking-normal"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
