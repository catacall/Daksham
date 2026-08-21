"use client";

import { FadeIn } from "@/components/FadeIn";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface ProjectAboutProps {
  title: string;
  description: any;
  status: string;
  area?: string | null;
  priceRange?: string | null;
  location?: string | null;
  highlights?: { point?: string | null }[] | null;
}

export default function ProjectAbout({
  title,
  description,
  status,
  area,
  priceRange,
  location,
  highlights,
}: ProjectAboutProps) {
  // Render description safely using Payload's RichText JSX renderer
  let descriptionContent = null;
  if (typeof description === "string") {
    descriptionContent = <p>{description}</p>;
  } else if (description && typeof description === "object") {
    descriptionContent = <RichText data={description} />;
  }

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16">
      {/* Quick Facts / Highlights as a responsive card layout */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 rounded-2xl sm:rounded-3xl border border-[#BF953F]/20 bg-[#D8DCE4] p-5 sm:p-6 md:p-8 sm:grid-cols-4 shadow-md">
          <div className="flex flex-col space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">
              Status
            </span>
            <span className="font-display text-base sm:text-lg font-medium text-navy capitalize">
              {status === "ongoing" ? "🏗️ Ongoing" : "✅ Delivered"}
            </span>
          </div>
          {area && (
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">
                Area
              </span>
              <span className="font-display text-base sm:text-lg font-medium text-navy">
                {area}
              </span>
            </div>
          )}
          {priceRange && (
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">
                Price
              </span>
              <span className="font-display text-base sm:text-lg font-medium text-navy">
                {priceRange.trim() ? priceRange : "Price on Request"}
              </span>
            </div>
          )}
          {location && (
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-normal text-muted">
                Location
              </span>
              <span className="font-display text-base sm:text-lg font-medium text-navy">
                {location}
              </span>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Key Highlights */}
      {highlights && highlights.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {highlights.map((h, idx) => h.point ? (
              <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy/5 border border-navy/10 text-navy text-xs sm:text-sm font-sans font-medium">
                ✨ {h.point}
              </span>
            ) : null)}
          </div>
        </FadeIn>
      )}

      {/* Description */}
      <FadeIn delay={0.3}>
        <div className="prose prose-lg prose-neutral max-w-none font-sans text-muted">
          <h2 className="font-display text-2xl sm:text-3xl text-navy font-medium uppercase tracking-normal mb-2">
            About {title}
          </h2>
          <div className="w-16 h-1 gold-gradient rounded-full mb-6" />
          {descriptionContent || <p>Details coming soon.</p>}
        </div>
      </FadeIn>
    </div>
  );
}
