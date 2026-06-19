import FloatingBadges from "@/components/FloatingBadges";
import Hero from "@/components/Frontend/Hero";
import About from "@/components/Frontend/About";
import ShowCase from "@/components/Frontend/ShowCase";
import Connect from "@/components/Frontend/Connect";
import Enquiry from "@/components/Enquiry";
import Ssc from "@/components/Frontend/ExploreVision";

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
