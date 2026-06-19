"use client";
import Image from "next/image";

export default function Award() {
  return (
    <>
      <section id="awards" className="section-padding bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide uppercase">
              Excellence
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
              Awards & Recognition
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            <Image
              src="/thumb-1.jpg"
              alt="Award 1"
              className="h-40 md:h-56 w-auto object-contain rounded-lg shadow-sm"
              height={224}
              width={400}
              quality={90}
            />
            <Image
              src="/thumb-2.jpg"
              alt="Award 2"
              className="h-40 md:h-56 w-auto object-contain rounded-lg shadow-sm"
              height={224}
              width={400}
              quality={90}
            />
          </div>
        </div>
      </section>
    </>
  );
}
