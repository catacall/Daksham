import FloatingBadges from "@/components/FloatingBadges";
import Hero from "@/components/Frontend/Hero";
import About from "@/components/Frontend/About";
import ShowCase from "@/components/Frontend/ShowCase";
import Connect from "@/components/Frontend/Connect";
import Enquiry from "@/components/Enquiry";
import ExploreVision from "@/components/Frontend/ExploreVision";
import BrochureCTA from "@/components/Frontend/BrochureCTA";
import { getPayload } from "payload";
import configPromise from "@payload-config";

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

  return (
    <main className="min-h-screen">
      <Hero />
      {/* SWC Showcase Carousel */}
      <ExploreVision />
      {/* Who We Are About section*/}
      <About />
      {/* Showcase Placeholder */}
      <ShowCase />

      {/* Brochure CTA */}
      <BrochureCTA brochureUrl={brochureUrl} />
     
      {/* Connect With Us */}
      <Connect />
      {/* Enquiry */}
      <Enquiry projects={formattedProjects} />
      <FloatingBadges />
    </main>
  );
}

