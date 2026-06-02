import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/ProjectGrid";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "Delivered Premium Real Estate | Daksham Developers",
  description: "View our completed and successfully handed over premium landmarks. Witness the legacy of quality, excellence, and luxury delivered by Daksham Developers.",
};

export default async function DeliveredProjectsPage() {
  const payload = await getPayload({ config: configPromise });

  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    where: {
      status: {
        equals: "delivered",
      },
    },
    sort: "-publishedAt",
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ProjectGrid projects={projects} currentFilter="delivered" />
      <Footer />
    </main>
  );
}
