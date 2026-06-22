import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Daksham Developers | Real Estate Enquiry Navi Mumbai",
  description:
    "Get in touch with Daksham Developers for premium real estate advisory in Navi Mumbai & Thane. Visit our Vashi office or call +91 99675 56073 for site visits and enquiries.",
  alternates: { canonical: "https://dakshamdevelopers.com/contact" },
  openGraph: {
    url: "https://dakshamdevelopers.com/contact",
    title: "Contact Daksham Developers | Real Estate Enquiry Navi Mumbai",
    description: "Enquire about luxury residential projects in Navi Mumbai. Call +91 99675 56073 or visit our Vashi office.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Daksham Developers" }],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const payload = await getPayload({ config: configPromise });

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
    <div className="bg-off-white min-h-screen px-4 py-24 sm:py-28 md:py-32 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <FadeIn delay={0.1}>
          <div className="mb-10 sm:mb-12 md:mb-16 border-b border-border-light pb-6 sm:pb-8 text-center">
            
            <h1 className="text-3xl sm:text-4xl font-display font-medium uppercase tracking-wide text-navy md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg font-sans text-muted">
              Have a question about our projects? Looking to buy your dream
              home? Get in touch with our team today.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:gap-12 md:gap-16 lg:grid-cols-2">
          {/* Contact Details & Map */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <FadeIn delay={0.2} direction="right">
              <div className="rounded-2xl sm:rounded-3xl border border-border-light bg-white p-6 sm:p-8 md:p-10 shadow-xl shadow-navy/5">
                <h2 className="mb-6 sm:mb-8 font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">
                  Reach Out
                </h2>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start group">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 transition-colors group-hover:bg-cyan/20">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-cyan" />
                    </div>
                    <div className="ml-4 sm:ml-6 space-y-4">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                        Office Addresses
                      </h3>
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy block">Corporate Office</span>
                        <p className="mt-1 font-sans text-muted leading-relaxed text-sm">
                          806, 8th Floor, Satra Plaza, Sec-19D,
                          <br />
                          19D, Palm Beach Road, Phase -2,
                          <br />
                          Vashi, Navi Mumbai - 400703
                        </p>
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy block">Registered Office</span>
                        <p className="mt-1 font-sans text-muted leading-relaxed text-sm">
                          39, Arenja Corner, Sector-17,
                          <br />
                          Vashi, Navi Mumbai - 400703
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 transition-colors group-hover:bg-cyan/20">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-cyan" />
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                        Phone
                      </h3>
                      <p className="mt-1.5 sm:mt-2 font-sans text-muted text-sm">
                        <a
                          href="tel:+919967556073"
                          className="hover:text-cyan transition-colors"
                        >
                          +91 99675 56073
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 transition-colors group-hover:bg-cyan/20">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-cyan" />
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                        Email
                      </h3>
                      <p className="mt-1.5 sm:mt-2 font-sans text-muted text-sm">
                        <a
                          href="mailto:info@dakshamdevelopers.com"
                          className="hover:text-cyan transition-colors"
                        >
                          info@dakshamdevelopers.com
                        </a>
                      </p>
                    </div>
                  </div>
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
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </FadeIn>
          </div>

          {/* Enquiry Form */}
          <div className="lg:pl-4 xl:pl-8">
            <FadeIn delay={0.3} direction="left">
              <div className="mb-6 sm:mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-medium uppercase tracking-wide text-navy">
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
