import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichText from "@/components/RichText";
import EnquiryButton from "@/components/EnquiryButton";
import ProjectCard from "@/components/ProjectCard";
import { MapPin, Home, IndianRupee, Calendar, ShieldCheck, Star } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    limit: 100,
  });

  return projects.map((p: any) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "projects" as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const project = docs[0] as any;
  if (!project) {
    return {
      title: "Project Not Found | Daksham Developers",
    };
  }

  return {
    title: `${project.title} | Premium Real Estate | Daksham Developers`,
    description: `Discover the luxury estate details of ${project.title} located at ${project.location}. Price range: ${project.priceRange}. Configured with ${project.area}.`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  // Fetch the project details
  const { docs } = await payload.find({
    collection: "projects" as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const project = docs[0] as any;
  if (!project) {
    return notFound();
  }

  // Fetch related projects (same status, limit to 3, exclude current)
  const { docs: relatedProjects } = await payload.find({
    collection: "projects" as any,
    where: {
      and: [
        {
          slug: {
            not_equals: slug,
          },
        },
        {
          status: {
            equals: project.status,
          },
        },
      ],
    },
    limit: 3,
  });

  const isOngoing = project.status === "ongoing";
  const images = project.images || [];
  const heroImage = images[0]?.url || "/logo.png";
  const heroAlt = images[0]?.alt || project.title;

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateProject",
            "name": project.title,
            "description": "Luxurious real estate project development by Daksham Developers.",
            "location": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": project.location
              }
            },
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": project.priceRange,
                "priceCurrency": "INR"
              }
            },
            "image": heroImage ? (heroImage.startsWith("http") ? heroImage : `https://convertotools.com${heroImage}`) : ""
          })
        }}
      />
      <Navbar />

      {/* Luxury Hero Banner */}
      <section className="relative h-[60vh] md:h-[75vh] w-full bg-slate-900 flex items-end">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        {/* Dark gold-tinted gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/45 to-black/20 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative container mx-auto px-6 pb-12 md:pb-20 z-10">
          <div className="max-w-4xl">
            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg mb-6 ${
                isOngoing
                  ? "bg-amber-500 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {isOngoing ? "Ongoing Development" : "Delivered Project"}
            </span>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-background font-medium uppercase tracking-wider mb-4 leading-tight">
              {project.title}
            </h1>

            {/* Location Subhead */}
            <div className="flex items-center gap-2 text-slate-300 font-sans text-base md:text-lg">
              <MapPin size={20} className="text-accent" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container mx-auto px-6 py-12 md:py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Description & Gallery */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold uppercase tracking-wider mb-6 border-b border-border pb-4">
                Project Overview
              </h2>
              <RichText content={project.description} />
            </div>

            {/* Gallery Grid */}
            {images.length > 1 && (
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold uppercase tracking-wider mb-6 border-b border-border pb-4">
                  Visual Showcase
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.slice(1).map((image: any, idx: number) => (
                    <div
                      key={image.id || idx}
                      className="relative aspect-video rounded-xl overflow-hidden shadow-md group border border-slate-200/40"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${project.title} Gallery Image ${idx + 2}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Spec Sheet & Enquiry Sticky */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-border/80 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-6">
              <h3 className="font-display text-xl text-foreground font-semibold uppercase tracking-widest border-b border-border pb-4 flex items-center gap-2">
                <Star size={18} className="text-accent fill-accent" />
                Key Parameters
              </h3>

              {/* Specs List */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <span className="text-sm font-sans text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={16} /> Location
                  </span>
                  <span className="text-sm font-sans text-foreground font-bold text-right pl-4">
                    {project.location}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <span className="text-sm font-sans text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Home size={16} /> Configuration
                  </span>
                  <span className="text-sm font-sans text-foreground font-bold text-right pl-4">
                    {project.area}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <span className="text-sm font-sans text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <IndianRupee size={16} /> Price Range
                  </span>
                  <span className="text-sm font-sans text-accent font-bold text-right pl-4">
                    {project.priceRange}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <span className="text-sm font-sans text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={16} /> Status
                  </span>
                  <span
                    className={`text-sm font-sans font-bold text-right pl-4 ${
                      isOngoing ? "text-amber-500" : "text-emerald-600"
                    }`}
                  >
                    {isOngoing ? "Ongoing Construction" : "Successfully Handed Over"}
                  </span>
                </div>
              </div>

              {/* Service/Safety Guarantee badge */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 items-center">
                <div className="text-emerald-600 shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div className="text-xs font-sans text-slate-600 leading-normal">
                  <span className="font-bold text-foreground block">Verified Luxury Landmark</span>
                  RERA approved & bank-financeable with clear titles.
                </div>
              </div>

              {/* enquiry CTA button */}
              <EnquiryButton
                projectTitle={project.title}
                label="Enquire About This Project"
                className="w-full bg-foreground text-background hover:bg-accent hover:text-foreground py-4 rounded-xl shadow-md text-sm cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200/60 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold uppercase tracking-wider mb-12 text-center">
              Similar Developments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p: any) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
