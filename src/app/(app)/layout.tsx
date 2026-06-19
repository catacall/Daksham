import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import ChatbotDrawer from "@/components/ChatbotDrawer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daksham Developers | Premium Real Estate",
  description:
    "Daksham Developers — Engineering luxury landmarks. Premium real estate projects in Navi Mumbai and Thane.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <main className="flex-1 flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </main>

        {/* Global overlays — rendered on every page */}
        <EnquiryModal />
        <ChatbotDrawer />
      </body>
    </html>
  );
}
