import React from 'react'

export default function ShowCase() {
  return (
    <>
      <section
        id="projects"
        className="section-padding bg-slate-50 overflow-hidden"
      >
        <div className="container mx-auto px-6 mb-16">
          <div className="mb-12">
            <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide uppercase">
              Featured Projects
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
              Luxurious Landmarks
            </h2>
          </div>
        </div>
        <div className="h-screen bg-muted/20 flex items-center justify-center ">
          Placeholder for GSAP Horizontal Scroll
        </div>
      </section>
    </>
  );
}
