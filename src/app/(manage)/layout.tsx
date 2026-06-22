import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "@/app/(app)/globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daksham Developers | Manage Panel",
  description: "Secure Admin Console",
  robots: "noindex, nofollow",
};

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${outfit.variable} data-scroll-behavior="smooth"`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-off-white text-navy antialiased font-sans"
      >
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
