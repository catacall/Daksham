"use client";

import { FadeIn } from "@/components/FadeIn";
import Image from "next/image";

interface AmenitiesGridProps {
  photos: string[];
  projectTitle: string;
}

export default function AmenitiesGrid({ photos, projectTitle }: AmenitiesGridProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="space-y-6 sm:space-y-8 my-10 sm:my-12">
      <FadeIn delay={0.1}>
        <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">
          Amenities
        </h2>
        <div className="w-16 h-1 gold-gradient rounded-full mt-3 mb-6" />
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {photos.map((photoUrl, idx) => (
          <FadeIn key={idx} delay={0.15 + (idx % 4) * 0.05}>
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-off-white border border-border-light group shadow-sm aspect-square">
              <Image
                src={photoUrl}
                alt={`${projectTitle} Amenity ${idx + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white font-sans font-bold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  Amenity {idx + 1}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
