"use client"

import { EnquiryForm } from './EnquiryForm';

interface EnquiryProps {
  projects?: { id: string; title: string }[];
}

export default function Enquiry({ projects = [] }: EnquiryProps) {
  return (
    <section id="enquiry" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-10 sm:mb-12 md:mb-16 text-center">
          <h4 className="text-cyan text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-medium tracking-wide uppercase">
            Enquiry
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-navy font-medium uppercase leading-snug tracking-wide">
            Feel Free to get in touch
          </h2>
        </div>
        <EnquiryForm projects={projects} />
      </div>
    </section>
  );
}

