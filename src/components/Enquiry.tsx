"use client"

import { EnquiryForm } from '@/components/EnquiryForm';

interface EnquiryProps {
  projects?: { id: string; title: string }[];
}

export default function Enquiry({ projects = [] }: EnquiryProps) {
  return (
    <section id="enquiry" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-navy font-bold uppercase tracking-wide leading-relaxed">
            Get in Touch with Us
          </h2>
          <div className="mt-4 w-16 h-1 gold-gradient mx-auto rounded-full" />
        </div>
        <EnquiryForm projects={projects} />
      </div>
    </section>
  );
}

