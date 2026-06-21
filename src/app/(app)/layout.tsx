import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

import ClientShell from "./ClientShell";

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
  title: "Daksham Developers | Premium Real Estate",
  description:
    "Daksham Developers — Engineering luxury landmarks. Premium real estate projects in Navi Mumbai and Thane.",
  metadataBase: new URL("https://dakshamdevelopers.com"),
};

export default function RootLayout({
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
        className="min-h-screen bg-background text-foreground antialiased"
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
