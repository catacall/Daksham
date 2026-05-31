"use client";

import Navbar from "@/components/Navbar";
import FloatingBadges from "@/components/FloatingBadges";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ShowCase from "@/components/ShowCase";
import NewsEvent from "@/components/NewsEvent";
import Connect from "@/components/Connect";
import Enquiry from "@/components/Enquiry";
import Award from "@/components/Award";
import Ssc from "@/components/Ssc";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* SWC Showcase Carousel */}
      <Ssc />
      {/* Who We Are  About section*/}
      <About />
      {/* Showcase Placeholder */}
      <ShowCase />
      {/* Awards */}
      <Award />
      {/* News & Events */}
      <NewsEvent />
      {/* Connect With Us */}
      <Connect />
      {/* Enquiry */}
      <Enquiry />
      {/* Footer */}
      <Footer />
      <FloatingBadges />
    </main>
  );
}
