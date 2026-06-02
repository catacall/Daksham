import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/ProjectGrid";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "Ongoing Premium Developments | Daksham Developers",
  description: "Explore our ongoing ultra-luxury residential and commercial projects. Experience exceptional design, modern amenities, and prime locations under construction by Daksham Developers.",
};

export default async function OngoingProjectsPage() {
  const payload = await getPayload({ config: configPromise });

  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    where: {
      status: {
        equals: "ongoing",
      },
    },
    sort: "-publishedAt",
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ProjectGrid projects={projects} currentFilter="ongoing" />
      <Footer />
    </main>
  );
}
