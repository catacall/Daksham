import { getPayload } from "payload";
import configPromise from "@payload-config";
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
  const payload = await getPayload({ config: configPromise });
  
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
  const payload = await getPayload({ config: configPromise });
  
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

  // Handle Images
  const images = (project.images || []).map((img: { url?: string } | string) => {
    if (typeof img === "string") return img;
    return img.url || "/placeholder-project.jpg";
  });
  
  const coverImage = images[0] || "/placeholder-project.jpg";
  const galleryImages = images.slice(1);

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
                telephone: "+919967556073",
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
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-100 sm:min-h-112.5 md:min-h-125 w-full bg-navy overflow-hidden">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-transparent" />
        
        {/* Subtle cyan glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 sm:w-150 h-37.5 sm:h-50 bg-cyan/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-12 z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn delay={0.1}>
              <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full border border-gold/50 bg-navy/50 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md shadow-lg">
                {project.status}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-medium uppercase tracking-wide text-white mb-3 sm:mb-4 drop-shadow-md">
                {project.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-2 sm:mt-4 flex items-center text-sm sm:text-base md:text-lg font-sans text-white/60 tracking-wide">
                <MapPin className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan" />
                {project.location}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:gap-16 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-12 md:space-y-16">
            
            {/* Quick Facts */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 rounded-2xl sm:rounded-3xl border border-border-light bg-white/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 sm:grid-cols-4 shadow-sm">
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] text-muted">Status</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy capitalize">{project.status}</span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] text-muted">Area</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">{project.area}</span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] text-muted">Price</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">{project.priceRange}</span>
                </div>
                <div className="flex flex-col space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] text-muted">Location</span>
                  <span className="font-display text-base sm:text-lg font-medium text-navy">{project.location}</span>
                </div>
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.2}>
              <div className="prose prose-lg prose-neutral max-w-none font-sans text-muted">
                <h2 className="font-display text-2xl sm:text-3xl text-navy font-medium uppercase tracking-wide mb-4 sm:mb-6">About {project.title}</h2>
                {descriptionContent || <p>Details coming soon.</p>}
              </div>
            </FadeIn>

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">Amenities & Specs</h2>
                  <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 sm:grid-cols-2">
                    {project.amenities.map((amenityGroup: { category: string; items: string }, idx: number) => (
                      <div key={idx} className="space-y-3 sm:space-y-4">
                        <h3 className="font-sans text-base sm:text-lg font-bold uppercase tracking-wider text-gold border-b border-border-light pb-2 sm:pb-3">{amenityGroup.category}</h3>
                        <ul className="space-y-2 sm:space-y-3 font-sans text-muted text-sm">
                          {amenityGroup.items.split(',').map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 sm:mr-3 mt-1.5 sm:mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                              <span>{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Specifications & Interiors */}
            {(project as any).specifications && (project as any).specifications.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">
                    Specifications & Interiors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </FadeIn>
            )}

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">Gallery</h2>
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
                <h3 className="mb-3 sm:mb-4 font-display text-xl sm:text-2xl font-medium uppercase tracking-wide text-navy">Interested?</h3>
                <p className="mb-6 sm:mb-8 font-sans text-muted text-sm">
                  Get in touch with our team for more details, premium brochures, and exclusive site visits.
                </p>
                <Link
                  href={`/contact?project=${project.id}`}
                  className="flex w-full items-center justify-center rounded-xl bg-gold px-6 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-navy transition-all hover:bg-gold-light hover:shadow-lg"
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
            className="flex w-full items-center justify-center rounded-xl bg-gold px-4 py-3 sm:py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-navy shadow-md active:scale-95 transition-transform"
          >
            Enquire Now
          </Link>
      </div>
    </div>
  );
}
