import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch only necessary fields for the dropdown
  const { docs: projects } = await payload.find({
    collection: "projects" as any,
    depth: 0,
    pagination: false,
    sort: "-publishedAt",
  });

  const formattedProjects = projects.map((p) => ({
    id: p.id as string,
    title: p.title,
  }));

  const params = await searchParams;
  const preselectedProject = typeof params?.project === "string" ? params.project : null;

  return (
    <div className="bg-neutral-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Have a question about our projects? Looking to buy your dream home? Get in touch with our team today.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Contact Details & Map */}
          <div className="space-y-8">
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <MapPin className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-semibold text-neutral-900">Office Address</h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      Office No. X, Vashi Plaza,<br />
                      Sector 17, Vashi,<br />
                      Navi Mumbai, 400703
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Phone className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-semibold text-neutral-900">Phone</h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      <a href="tel:+919876543210" className="hover:text-neutral-900">+91 98765 43210</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Mail className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-semibold text-neutral-900">Email</h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      <a href="mailto:info@dakshamdevelopers.com" className="hover:text-neutral-900">info@dakshamdevelopers.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="h-[300px] w-full overflow-hidden rounded-2xl border bg-neutral-200 shadow-sm sm:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8351543322046!2d72.99611117565863!3d19.070954252135674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c134063f9bd5%3A0x6b093156cfd8f5aa!2sVashi%20Plaza!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:pl-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Send an Enquiry</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
            <EnquiryForm projects={formattedProjects} preselectedProjectId={preselectedProject} />
          </div>

        </div>
      </div>
    </div>
  );
}
