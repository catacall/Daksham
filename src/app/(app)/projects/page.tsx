import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/ProjectGrid";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "Luxurious Landmarks & Real Estate Projects | Daksham Developers",
  description: "Browse the architectural masterpieces of Daksham Developers. Discover our premium portfolio of ongoing developments and successfully delivered luxury residences.",
};

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise });

  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    sort: "-publishedAt",
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ProjectGrid projects={projects} currentFilter="all" />
      <Footer />
    </main>
  );
}
