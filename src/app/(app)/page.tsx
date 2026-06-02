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
import Alliance from "@/components/Alliance";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Daksham Developers",
            "url": "https://convertotools.com",
            "logo": "https://convertotools.com/logo.png",
            "image": "https://convertotools.com/sai-world-city.jpg",
            "description": "Premium real estate and luxury landmarks developer.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Panvel & Kharghar",
              "addressLocality": "Navi Mumbai",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "telephone": "+1234567890",
            "sameAs": [
              "https://www.facebook.com",
              "https://www.instagram.com",
              "https://www.linkedin.com"
            ]
          })
        }}
      />
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
      {/* Alliances / Strategic Partners */}
      <Alliance />
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
