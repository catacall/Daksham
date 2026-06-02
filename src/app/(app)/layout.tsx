import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";
import EnquiryModal from "../Modal/EnquiryModal";
import LenisProvider from "@/components/LenisProvider";
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
  title: "Business Group | Premium Real Estate",
  description: "Upscale real estate and premium business group website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        <LenisProvider>
          {children}
        </LenisProvider>
        <EnquiryModal />
        <ChatbotDrawer />
      </body>
    </html>
  );
}
