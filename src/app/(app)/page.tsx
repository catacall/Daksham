import FloatingBadges from "@/components/FloatingBadges";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ShowCase from "@/components/ShowCase";
import Connect from "@/components/Connect";
import Enquiry from "@/components/Enquiry";
import Ssc from "@/components/Ssc";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* SWC Showcase Carousel */}
      <Ssc />
      {/* Who We Are  About section*/}
      <About />
      {/* Showcase Placeholder */}
      <ShowCase />
      {/* Awards */}
      {/* Connect With Us */}
      <Connect />
      {/* Enquiry */}
      <Enquiry />
      <FloatingBadges />
    </main>
  );
}
