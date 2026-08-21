import { getPayloadClient } from "@/lib/payloadClient";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Daksham Developers | Real Estate Enquiry Navi Mumbai",
  description:
    "Get in touch with Daksham Developers for premium real estate advisory in Navi Mumbai & Thane. Visit our Vashi office or call +91 96533 07030 for site visits and enquiries.",
  alternates: { canonical: "https://dakshamdevelopers.com/contact" },
  openGraph: {
    url: "https://dakshamdevelopers.com/contact",
    title: "Contact Daksham Developers | Real Estate Enquiry Navi Mumbai",
    description: "Enquire about luxury residential projects in Navi Mumbai. Call +91 96533 07030 or visit our Vashi office.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Daksham Developers" }],
  },
};

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const payload = await getPayloadClient();

  // Fetch only necessary fields for the dropdown
  const { docs: projects } = await payload.find({
    // cast collection to any because generated payload types may not include our custom collections
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: "projects" as any,
    depth: 0,
    pagination: false,
    sort: "-publishedAt",
  });

  type ProjectItem = { id: string; title?: string };
  const formattedProjects = (projects as ProjectItem[]).map(p => ({
    id: p.id,
    title: p.title || "",
  }));

  const params = await searchParams;
  const preselectedProject =
    typeof params?.project === "string" ? params.project : null;

  return (
    <div className="bg-off-white min-h-screen px-4 py-28 sm:py-32 md:py-36 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-12 sm:mb-14 md:mb-20 pb-0 text-center">
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-normal text-navy md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <div className="mt-6 w-20 h-1.5 gold-gradient mx-auto rounded-full" />
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg font-sans text-muted">
              Have a question about our projects? Looking to buy your dream
              home? Get in touch with our team today.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:gap-14 md:gap-16 lg:gap-20 lg:grid-cols-2">
          {/* Contact Details & Map */}
          <div className="space-y-10 sm:space-y-12 md:space-y-14">
            <FadeIn delay={0.2} direction="right">
              <div className="rounded-2xl sm:rounded-3xl border border-border-light bg-white p-7 sm:p-9 md:p-12 shadow-xl shadow-navy/5">
                <h2 className="mb-6 sm:mb-8 font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">
                  Reach Out
                </h2>
                <div className="space-y-7 sm:space-y-9">
                  <a
                    href="https://maps.google.com/?q=Satra+Plaza,+Sector+19D,+Vashi,+Navi+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start group p-4 -m-4 rounded-2xl hover:bg-[#BF953F]/5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#BF953F]/10 transition-colors group-hover:bg-[#BF953F]/20">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#BF953F]" />
                    </div>
                    <div className="ml-5 sm:ml-6 space-y-2.5">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy">
                        Office Addresses
                      </h3>
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-normal text-navy block mb-1">Corporate Office</span>
                        <span className="font-sans text-muted leading-relaxed text-sm group-hover:text-[#BF953F] transition-colors block">
                          806, 8th Floor, Satra Plaza,
                          <br />
                          Sector 19D, Plot No. 20,
                          <br />
                          Vashi, Navi Mumbai – 400703
                        </span>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start group">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#BF953F]/10 transition-colors group-hover:bg-[#BF953F]/20">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#BF953F]" />
                    </div>
                    <div className="ml-5 sm:ml-6 flex-1">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy mb-2">
                        Phone Numbers
                      </h3>
                      <div className="space-y-1.5">
                        <a
                          href="tel:+919653307030"
                          className="flex items-center gap-2 p-2 -mx-2 rounded-xl hover:bg-[#BF953F]/5 text-muted hover:text-[#BF953F] text-sm font-sans transition-colors cursor-pointer"
                        >
                          <span>📞</span>
                          <span>+91 96533 07030 (Primary)</span>
                        </a>
                        <a
                          href="tel:+919653313244"
                          className="flex items-center gap-2 p-2 -mx-2 rounded-xl hover:bg-[#BF953F]/5 text-muted hover:text-[#BF953F] text-sm font-sans transition-colors cursor-pointer"
                        >
                          <span>📞</span>
                          <span>+91 96533 13244 (Sales)</span>
                        </a>
                        <a
                          href="tel:02246099724"
                          className="flex items-center gap-2 p-2 -mx-2 rounded-xl hover:bg-[#BF953F]/5 text-muted hover:text-[#BF953F] text-sm font-sans transition-colors cursor-pointer"
                        >
                          <span>☎️</span>
                          <span>022 - 4609 9724 (Landline)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="mailto:dakshamdevelopers@gmail.com"
                    className="flex items-start group p-4 -m-4 rounded-2xl hover:bg-[#BF953F]/5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#BF953F]/10 transition-colors group-hover:bg-[#BF953F]/20">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#BF953F]" />
                    </div>
                    <div className="ml-5 sm:ml-6">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-normal text-navy">
                        Email Address
                      </h3>
                      <span className="mt-1.5 sm:mt-2 font-sans text-muted text-sm group-hover:text-[#BF953F] transition-colors block">
                        dakshamdevelopers@gmail.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Google Maps iframe */}
            <FadeIn delay={0.4} direction="right">
              <div className="h-62.5 sm:h-75 md:h-100 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-off-white shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?q=Satra%20Plaza,%20Sector%2019D,%20Vashi,%20Navi%20Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="transition-all duration-700"
                />
              </div>
            </FadeIn>
          </div>

          {/* Enquiry Form */}
          <div className="lg:pl-6 xl:pl-10">
            <FadeIn delay={0.3} direction="left">
              <div className="mb-8 sm:mb-10">
                <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-normal text-navy">
                  Send an Enquiry
                </h2>
                <p className="mt-2 sm:mt-3 font-sans text-muted text-sm sm:text-base">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>
              </div>
              <EnquiryForm
                projects={formattedProjects}
                preselectedProjectId={preselectedProject}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
