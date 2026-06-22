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
  metadataBase: new URL("https://dakshamdevelopers.com"),

  title: {
    default: "Daksham Developers | Premium Real Estate in Navi Mumbai",
    template: "%s | Daksham Developers",
  },
  description:
    "Daksham Developers — Engineering luxury landmarks in Navi Mumbai & Thane. Explore ongoing & delivered premium residential projects. RERA approved. Call +91 99675 56073.",

  keywords: [
    "Daksham Developers",
    "real estate Navi Mumbai",
    "luxury apartments Navi Mumbai",
    "premium flats Vashi",
    "new projects Panvel",
    "RERA approved flats Navi Mumbai",
    "residential projects Thane",
    "2 BHK 3 BHK Navi Mumbai",
    "real estate developer Navi Mumbai",
    "luxury condos Navi Mumbai",
  ],

  authors: [{ name: "Daksham Developers", url: "https://dakshamdevelopers.com" }],
  creator: "Daksham Developers",
  publisher: "Daksham Developers",

  alternates: {
    canonical: "https://dakshamdevelopers.com",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dakshamdevelopers.com",
    siteName: "Daksham Developers",
    title: "Daksham Developers | Premium Real Estate in Navi Mumbai",
    description:
      "Luxury residential projects in Navi Mumbai & Thane by Daksham Developers. RERA approved. Enquire today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daksham Developers — Premium Real Estate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Daksham Developers | Premium Real Estate in Navi Mumbai",
    description:
      "Luxury residential projects in Navi Mumbai & Thane. RERA approved. Enquire today.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
