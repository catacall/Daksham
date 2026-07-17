"use client";

import { FadeIn } from "@/components/FadeIn";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface SpecCategory {
  category?: string | null;
  items?: string | null;
}

interface RoomCard {
  title?: string | null;
  description?: string | null;
  image?: any;
}

interface ProjectSpecificationsProps {
  specCategories?: SpecCategory[] | null;
  roomCards?: RoomCard[] | null;
  floorPlanImage?: string | null;
  projectTitle: string;
}

export default function ProjectSpecifications({
  specCategories,
  roomCards,
  floorPlanImage,
  projectTitle,
}: ProjectSpecificationsProps) {
  if (
    (!specCategories || specCategories.length === 0) &&
    (!roomCards || roomCards.length === 0) &&
    !floorPlanImage
  ) {
    return null;
  }

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16 my-10 sm:my-12">
      <FadeIn delay={0.1}>
        <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">
          Specifications
        </h2>
        <div className="w-16 h-1 gold-gradient rounded-full mt-3 mb-6" />

        {/* Isometric floor plan image */}
        {floorPlanImage && (
          <div className="border border-border-light bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md max-w-2xl mx-auto mb-10">
            <img
              src={floorPlanImage}
              alt={`${projectTitle} Isometric Floor Plan`}
              className="w-full h-auto block object-contain"
            />
          </div>
        )}
      </FadeIn>

      {/* Technical Specifications Categories */}
      {specCategories && specCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {specCategories.map((group, idx) => {
            if (!group.category || !group.items) return null;
            const rawItems = group.items.split(",").map((s) => s.trim()).filter(Boolean);
            const uniqueItems = Array.from(new Set(rawItems));

            return (
              <FadeIn key={idx} delay={0.1 + idx * 0.05} className="h-full">
                <div className="h-full bg-white border border-[#BF953F]/15 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-12px_rgba(191,149,63,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#BF953F]/10">
                    <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                      <span className="text-xl">✨</span>
                    </div>
                    <h3 className="font-sans text-lg font-bold uppercase tracking-wider text-navy">
                      {group.category}
                    </h3>
                  </div>
                  <ul className="space-y-3 font-sans text-muted text-sm leading-relaxed flex-1">
                    {uniqueItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:text-navy transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}

      {/* Room specific cards (Specifications & Interiors) */}
      {roomCards && roomCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-8">
          {roomCards.map((spec, idx) => {
            const specImgUrl =
              spec.image && typeof spec.image === "object" && "url" in spec.image
                ? spec.image.url
                : null;

            return (
              <FadeIn key={`room-${idx}`} delay={0.2 + idx * 0.05} className="h-full">
                <div className="h-full bg-white border border-border-light rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  {specImgUrl && (
                    <div className="relative h-56 w-full bg-off-white overflow-hidden">
                      <Image
                        src={specImgUrl}
                        alt={spec.title || "Specification image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    {spec.title && (
                      <h3 className="font-display text-xl font-bold text-navy mb-3">
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
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
