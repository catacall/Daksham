import { getPayloadClient } from "@/lib/payloadClient";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import EnquiryButton from "@/components/EnquiryButton";
import ProjectAbout from "@/components/Frontend/Project/ProjectAbout";
import ProjectCurrentStatus from "@/components/Frontend/Project/ProjectCurrentStatus";
import ProjectSpecifications from "@/components/Frontend/Project/ProjectSpecifications";
import AmenitiesGrid from "@/components/Frontend/Project/AmenitiesGrid";

import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Force dynamic rendering — no DB connections at build time
export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const payload = await getPayloadClient();
  
  const { docs: projects } = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: "projects" as any,
    where: { slug: { equals: resolvedParams.slug } },
    limit: 1,
  });

  const project = projects[0];

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const baseUrl = "https://dakshamdevelopers.com";
  const pageUrl = `${baseUrl}/projects/${project.slug}`;
  const coverImageUrl =
    typeof project.coverImage === "object" && project.coverImage !== null
      ? (project.coverImage as { url?: string }).url
      : null;
  const ogImage = coverImageUrl || `${baseUrl}/og-image.jpg`;
  const statusLabel = project.status === "delivered" ? "Delivered" : "Ongoing";

  const title = `${project.title} | ${statusLabel} Project in ${project.location}`;
  const description = `${project.title} is a premium ${statusLabel.toLowerCase()} real estate project by Daksham Developers in ${project.location}. ${project.area ? `Available configurations: ${project.area}.` : ""} ${project.priceRange ? `Price: ${project.priceRange}.` : ""} ${project.reraNumber ? `RERA: ${project.reraNumber}.` : ""} Enquire now.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      `${project.title} ${project.location}`,
      `real estate ${project.location}`,
      `flats in ${project.location}`,
      `${project.area || "apartments"} ${project.location}`,
      "Daksham Developers",
      "RERA approved",
      `luxury homes ${project.location}`,
    ].filter(Boolean),
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: "Daksham Developers",
      locale: "en_IN",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: project.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const payload = await getPayloadClient();
  
  const { docs: projects } = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: "projects" as any,
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
    },
    limit: 1,
  });

  const project = projects[0];

  if (!project) {
    notFound();
  }

  // ── Image URL extraction helper ──────────────────────────────────────────
  const extractUrl = (img: unknown): string => {
    if (!img) return "";
    if (typeof img === "object" && img !== null && "url" in img) {
      return (img as { url?: string }).url || "";
    }
    if (typeof img === "string") {
      return img.startsWith("url:") ? img.slice(4) : img;
    }
    return "";
  };

  // Handle Images
  const images = (project.images || [])
    .map(extractUrl)
    .filter((u: string) => u.startsWith("http") || u.startsWith("/"));

  // Amenity Photos
  const amenityPhotos = (project.amenityPhotos || [])
    .map(extractUrl)
    .filter((u: string) => u.startsWith("http") || u.startsWith("/")) as string[];

  const coverImage =
    (project.coverImage && typeof project.coverImage === "object" && "url" in project.coverImage
      ? (project.coverImage as { url?: string }).url
      : typeof project.coverImage === "string"
      ? (project.coverImage as string).startsWith("url:")
        ? (project.coverImage as string).slice(4)
        : project.coverImage
      : null) ||
    images[0] ||
    "/placeholder-project.webp";
    
  const galleryImages = images.filter((u: string) => u !== coverImage);

  // ── JSON-LD Structured Data ──
  const baseUrl = "https://dakshamdevelopers.com";
  const pageUrl = `${baseUrl}/projects/${project.slug}`;
  const descriptionText =
    typeof project.description === "string"
      ? project.description
      : `Premium ${project.status} real estate project by Daksham Developers in ${project.location}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Apartment",
        "@id": pageUrl,
        name: project.title,
        description: descriptionText,
        url: pageUrl,
        image: coverImage.startsWith("http") ? coverImage : `${baseUrl}${coverImage}`,
        ...(project.priceRange && { priceRange: project.priceRange }),
        address: {
          "@type": "PostalAddress",
          addressLocality: project.location,
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        amenityFeature: (project.highlights || []).map(
          (h: { point?: string }) => ({ "@type": "LocationFeatureSpecification", name: h.point })
        ),
        additionalProperty: [
          project.area && { "@type": "PropertyValue", name: "Configuration", value: project.area },
          project.reraNumber && { "@type": "PropertyValue", name: "RERA Number", value: project.reraNumber },
          project.status && { "@type": "PropertyValue", name: "Status", value: project.status },
        ].filter(Boolean),
        offers: project.priceRange
          ? {
              "@type": "Offer",
              description: project.priceRange,
              seller: {
                "@type": "RealEstateAgent",
                name: "Daksham Developers",
                url: baseUrl,
                telephone: "+919653307030",
              },
            }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#BABFC9] min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Header */}
      <div className="relative w-full bg-navy py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden border-b border-border-dark">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 sm:w-150 h-37.5 sm:h-50 gold-gradient/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="md:col-span-6 text-left flex flex-col justify-center">
              <FadeIn delay={0.1}>
                <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal gold-gradient-text shadow-lg w-fit">
                  {project.status === "ongoing" ? "🏗️ Ongoing" : "✅ Delivered"}
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium uppercase tracking-normal text-white mb-3 sm:mb-4 drop-shadow-md leading-tight">
                  {project.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg font-sans text-white/70 tracking-normal">
                  <div className="flex items-center">
                    <MapPin className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37] shrink-0" />
                    {project.location}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.title + " " + project.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-normal transition-all w-fit shadow-xs"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                    </span>
                    View Live Map
                  </a>
                </div>
              </FadeIn>
            </div>
            
            {/* Right Image Box */}
            <div className="md:col-span-6 w-full">
              <FadeIn delay={0.4}>
                <div className="relative aspect-16/10 md:aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-navy-light z-10">
                  <Image
                    src={coverImage}
                    alt={project.title!}
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:gap-16 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-12 md:space-y-16">
            
            {/* 1. About Project */}
            <ProjectAbout
              title={project.title!}
              description={project.description}
              status={project.status || "ongoing"}
              area={project.area}
              priceRange={project.priceRange}
              location={project.location}
              highlights={project.highlights}
            />

            {/* 2. Current Status */}
            {project.status === "ongoing" && ((project as any).constructionProgress !== undefined || (project as any).constructionImage) && (
              <ProjectCurrentStatus
                progress={(project as any).constructionProgress || 0}
                imageUrl={
                  (project as any).constructionImage &&
                  typeof (project as any).constructionImage === "object" &&
                  "url" in (project as any).constructionImage &&
                  (project as any).constructionImage.url
                    ? (project as any).constructionImage.url
                    : null
                }
                projectTitle={project.title!}
              />
            )}

            {/* 3. Specifications */}
            <ProjectSpecifications
              specCategories={project.amenities}
              roomCards={(project as any).specifications}
              floorPlanImage={
                project.specificationImage && typeof project.specificationImage === "object" && "url" in project.specificationImage && project.specificationImage.url
                  ? project.specificationImage.url
                  : null
              }
              projectTitle={project.title!}
            />

            {/* 4. Amenities */}
            <AmenitiesGrid
              photos={amenityPhotos}
              projectTitle={project.title!}
            />

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-4 my-10 sm:my-12">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">Gallery</h2>
                    <div className="w-16 h-1 gold-gradient rounded-full mt-3 mb-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
                    {galleryImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-off-white shadow-sm border border-border-light group">
                        <Image
                          src={img}
                          alt={`${project.title} Gallery ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
            
          </div>

          {/* Sticky Sidebar / Mobile Bottom Bar */}
          <div className="lg:col-span-1 hidden lg:block">
            <FadeIn delay={0.6} direction="left">
              <div className="sticky top-32 rounded-3xl border border-[#BF953F]/25 bg-[#D5D9E1] p-6 sm:p-8 shadow-xl shadow-navy/10">
                <h3 className="mb-3 sm:mb-4 font-display text-xl sm:text-2xl font-medium uppercase tracking-normal text-navy">Interested in this Landmark?</h3>
                <p className="mb-6 sm:mb-8 font-sans text-muted text-sm leading-relaxed">
                  Connect with our client relations team for private viewings, pricing sheets, and project brochures.
                </p>
                <EnquiryButton
                  projectTitle={project.title!}
                  label="Enquire Now"
                  className="flex w-full items-center justify-center rounded-xl gold-gradient px-6 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy transition-all hover:gold-gradient-light hover:shadow-lg"
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
      
      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-border-dark bg-navy p-3 sm:p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] lg:hidden">
         <EnquiryButton
            projectTitle={project.title!}
            label="Enquire Now"
            className="flex w-full items-center justify-center rounded-xl gold-gradient px-4 py-3 sm:py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy shadow-md active:scale-95 transition-transform"
          />
      </div>
    </div>
  );
}
