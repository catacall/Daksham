"use client"

import { EnquiryForm } from './EnquiryForm';

interface EnquiryProps {
  projects?: { id: string; title: string }[];
}

export default function Enquiry({ projects = [] }: EnquiryProps) {
  return (
    <section id="enquiry" className="section-padding bg-white">
      <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <span className="eyebrow block mb-2 sm:mb-3">
            Enquiry
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-medium uppercase leading-snug tracking-wide">
            Feel Free to Get in Touch
          </h2>
        </div>
        <EnquiryForm projects={projects} />
      </div>
    </section>
  );
}

