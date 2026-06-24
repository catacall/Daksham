import FloatingBadges from "@/components/FloatingBadges";
import Hero from "@/components/Frontend/Hero";
import About from "@/components/Frontend/About";
import ShowCase from "@/components/Frontend/ShowCase";
import Enquiry from "@/components/Enquiry";
import ExploreVision from "@/components/Frontend/ExploreVision";
import DeveloperProfile from "@/components/Frontend/DeveloperProfile";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daksham Developers | Premium Real Estate in Navi Mumbai & Thane",
  description:
    "Daksham Developers — engineering luxury landmarks in Navi Mumbai & Thane. Discover RERA-approved 2, 3 & 4 BHK premium apartments in Vashi, Panvel, and beyond. Enquire today.",
  alternates: { canonical: "https://dakshamdevelopers.com" },
  openGraph: {
    url: "https://dakshamdevelopers.com",
    title: "Daksham Developers | Premium Real Estate in Navi Mumbai & Thane",
    description:
      "Engineering luxury landmarks in Navi Mumbai & Thane. RERA approved. Call +91 99675 56073.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Daksham Developers" }],
  },
};

export const revalidate = 0;

export default async function Home() {
  const payload = await getPayload({ config: configPromise });

  // Fetch only necessary fields for the dropdown
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    depth: 0,
    pagination: false,
    sort: "-publishedAt",
  });

  // Fetch brochure from Site Settings global
  const settings = (await (payload as any).findGlobal({
    slug: "site-settings",
    depth: 1,
  })) as any;
  const brochureUrl = typeof settings?.brochure === "object" && settings?.brochure !== null ? (settings.brochure as any).url : null;

  type ProjectItem = { id: string; title?: string };
  const formattedProjects = (projects as ProjectItem[]).map(p => ({
    id: p.id,
    title: p.title || "",
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Daksham Developers",
    url: "https://dakshamdevelopers.com",
    logo: "https://dakshamdevelopers.com/logo.png",
    description:
      "Premium real estate developer in Navi Mumbai and Thane. RERA approved luxury residential projects.",
    telephone: "+919967556073",
    email: "info@dakshamdevelopers.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "806, 8th Floor, Satra Plaza, Sector 19D, Palm Beach Road",
      addressLocality: "Vashi, Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400703",
      addressCountry: "IN",
    },
    areaServed: ["Navi Mumbai", "Thane", "Panvel", "Vashi", "Mumbai"],
    sameAs: [],
  };

  return (
    <main className="min-h-screen ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      {/* SWC Showcase Carousel */}
       <DeveloperProfile />
      {/* Who We Are About section*/}
      <About />
      {/* Developer Profile / Visionary Collaboration Section */}
     
      {/* Showcase Placeholder */}
      <ShowCase brochureUrl={brochureUrl} />
      <ExploreVision />
      {/* Enquiry */}
      <Enquiry projects={formattedProjects} />
      <FloatingBadges />
    </main>
  );
}

