import { getPayloadClient } from "@/lib/payloadClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { RichText } from "@payloadcms/richtext-lexical/react";

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

const commonSpecifications = [
  {
    category: "Flooring",
    items: "Vitrified flooring in living, dining, bedroom, kitchen and passage"
  },
  {
    category: "Kitchen",
    items: "Granite kitchen platform with marble support, Stainless steel sink, Tile dado above platform"
  },
  {
    category: "Electrical",
    items: "Electrical wiring & fitting of concealed type P.V.C conduit – good quality wires, All switches of reputed make, TV, Internet, AC point, ceiling fan point and regulator point in living, TV, AC point, ceiling fan point and regulator point in bedroom"
  },
  {
    category: "Doors",
    items: "Flushed Doors in living, and bedrooms with the laminate finish on both sides"
  },
  {
    category: "Windows",
    items: "Sliding windows with clear glass, Decorative M.S. railing for living room balcony & kitchen utility, M.S. grills for bedroom windows"
  },
  {
    category: "Painting",
    items: "All walls painted in premium quality paint"
  },
  {
    category: "Sanitary",
    items: "Anti-skid tiles for all toilets flooring, State-of-the-art CP fittings and sanitary fixtures, Instant geyser and hot-cold water mixer in shower area, Well-ventilated bathrooms"
  },
  {
    category: "Security",
    items: "Fire fighting and fire alarm system for entire building"
  }
];

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

  const isCommonSpecProject = 
    project.slug === "united-emporio" || 
    project.slug === "gauri-ganesha" || 
    project.slug === "ce-la-vie";
    
  const specList = isCommonSpecProject ? commonSpecifications : (project.amenities || []);

  // ── Image URL extraction helper ──────────────────────────────────────────
  // Handles three possible shapes an image entry can have:
  //  1. Payload-resolved object   → { url: "https://..." }
  //  2. Plain blob URL string      → "https://xxx.blob.vercel-storage.com/..."
  //  3. Fallback url:-prefixed ID  → "url:https://..." (when DB insert failed)
  const extractUrl = (img: unknown): string => {
    if (!img) return "";
    if (typeof img === "object" && img !== null && "url" in img) {
      return (img as { url?: string }).url || "";
    }
    if (typeof img === "string") {
      // Strip the fallback "url:" prefix if present
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

  // Render description safely using Payload's RichText JSX renderer
  let descriptionContent = null;
  if (typeof project.description === "string") {
     // Plain string fallback — render as text (no HTML injection)
     descriptionContent = <p>{project.description}</p>;
  } else if (project.description && typeof project.description === "object") {
     // Lexical SerializedEditorState — render safely via Payload's RichText component
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     descriptionContent = <RichText data={project.description as any} />;
  }

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
    <div className="bg-off-white min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Header */}
      <div className="relative w-full bg-navy py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden border-b border-border-dark">
        {/* Subtle cyan glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 sm:w-150 h-37.5 sm:h-50 bg-cyan/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
        
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
                    <MapPin className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan shrink-0" />
                    {project.location}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.title + " " + project.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-normal transition-all w-fit shadow-xs"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                    </span>
                    View Live Map
                  </a>
                </div>
              </FadeIn>
            </div>
            
            {/* Right Image Box (Pixel-clear, no dark overlay) */}
            <div className="md:col-span-6 w-full">
              <FadeIn delay={0.4}>
                <div className="relative aspect-16/10 md:aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-navy-light z-10">
                  <Image
                    src={coverImage}
                    alt={project.title}
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
            
            {/* Quick Facts */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 rounded-2xl sm:rounded-3xl border border-border-light bg-white/80 p-5 sm:p-6 md:p-8 sm:grid-cols-4 shadow-sm">
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">Status</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy capitalize">
                    {project.status === "ongoing" ? "🏗️ Ongoing" : "✅ Delivered"}
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">Area</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">{project.area}</span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">Price</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">
                    {project.priceRange && project.priceRange.trim() ? project.priceRange : "On Enquire"}
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">Location</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">{project.location}</span>
                </div>
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.2}>
              <div className="prose prose-lg prose-neutral max-w-none font-sans text-muted">
                <h2 className="font-display text-2xl sm:text-3xl text-navy font-medium uppercase tracking-normal mb-4 sm:mb-6">About {project.title}</h2>
                {descriptionContent || <p>Details coming soon.</p>}
              </div>
            </FadeIn>

            {/* Specification Section */}
            <FadeIn delay={0.2}>
              <div className="space-y-6 sm:space-y-8">
                <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">
                  Specification
                </h2>
                
                {/* Isometric floor plan header image */}
                <div className="relative aspect-4/3 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-white shadow-md">
                  <Image
                    src={
                      project.specificationImage && typeof project.specificationImage === "object" && "url" in project.specificationImage && project.specificationImage.url
                        ? project.specificationImage.url
                        : (project.slug === "gauri-ganesha" ? "/api/media/file/floorplan_1bhk.webp" : "/api/media/file/floorplan_2bhk.webp")
                    }
                    alt={`${project.title} Isometric Floor Plan`}
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                  />
                </div>

                {/* Technical Specifications (from specList) */}
                {specList && specList.length > 0 && (
                  <div className="bg-[#E1E4E8]/60 border border-border-light/40 rounded-3xl p-6 sm:p-8 md:p-10 mt-8 shadow-xs">
                    <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2">
                      {specList.map((amenityGroup: { category: string; items: string }, idx: number) => (
                        <div key={idx} className="space-y-3 sm:space-y-4">
                          <h3 className="font-sans text-base sm:text-lg font-bold uppercase tracking-wider text-[#9E7C30] border-b-2 border-[#BF953F]/30 pb-2 sm:pb-3">
                            {amenityGroup.category}
                          </h3>
                          <ul className="space-y-2.5 sm:space-y-3 font-sans text-muted text-sm leading-relaxed">
                            {amenityGroup.items.split(',').map((item: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2.5 sm:mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                                <span>{item.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications & Interiors (Room Cards, if any) */}
                {(project as any).specifications && (project as any).specifications.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {(project as any).specifications.map((spec: any, idx: number) => {
                      const specImg = typeof spec.image === "object" && spec.image !== null ? spec.image.url : null;
                      return (
                        <div key={idx} className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-xs flex flex-col">
                          {specImg && (
                            <div className="relative h-56 w-full bg-off-white">
                              <Image
                                src={specImg}
                                alt={spec.title || "Specification image"}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="p-5 flex-1 flex flex-col justify-center">
                            {spec.title && (
                              <h3 className="font-display text-lg font-bold text-navy mb-2">
                                {spec.title}
                              </h3>
                            )}
                            {spec.description && (
                              <p className="font-sans text-muted text-sm leading-relaxed">
                                {spec.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Amenities Section (Photos Grid only, label removed) */}
            {amenityPhotos.length > 0 && (
              <FadeIn delay={0.25}>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">Amenities</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {amenityPhotos.map((photoUrl, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-off-white border border-border-light group shadow-sm aspect-square"
                      >
                        <Image
                          src={photoUrl}
                          alt={`${project.title} amenity ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">Gallery</h2>
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

            {/* Virtual Tour Links */}
          
            
          </div>

          {/* Sticky Sidebar / Mobile Bottom Bar */}
          <div className="lg:col-span-1 hidden lg:block">
            <FadeIn delay={0.6} direction="left">
              <div className="sticky top-32 rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-xl shadow-navy/5">
                <h3 className="mb-3 sm:mb-4 font-display text-xl sm:text-2xl font-medium uppercase tracking-normal text-navy">Interested in this Landmark?</h3>
                <p className="mb-6 sm:mb-8 font-sans text-muted text-sm leading-relaxed">
                  Connect with our client relations team for private viewings, pricing sheets, and project brochures.
                </p>
                <Link
                  href={`/contact?project=${project.id}`}
                  className="flex w-full items-center justify-center rounded-xl gold-gradient px-6 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy transition-all hover:gold-gradient-light hover:shadow-lg"
                >
                  Enquire Now
                </Link>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
      
      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-border-dark bg-navy p-3 sm:p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] lg:hidden">
         <Link
            href={`/contact?project=${project.id}`}
            className="flex w-full items-center justify-center rounded-xl gold-gradient px-4 py-3 sm:py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy shadow-md active:scale-95 transition-transform"
          >
            Enquire Now
          </Link>
      </div>
    </div>
  );
}
