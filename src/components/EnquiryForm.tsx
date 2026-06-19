"use client";

import { useState } from "react";
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  projectInterestedIn: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  source: z.string().default("website"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryFormProps {
  projects: { id: string; title: string }[];
  preselectedProjectId?: string | null;
}

export function EnquiryForm({ projects, preselectedProjectId }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    projectInterestedIn: preselectedProjectId || "",
    message: "",
    source: "website",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setErrors({});

    try {
      // Client-side validation
      const validatedData = enquirySchema.parse(formData);

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectInterestedIn: "",
        message: "",
        source: "website",
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: any = {};
        (err as any).errors.forEach((e: any) => {
          if (e.path[0]) {
            fieldErrors[e.path[0]] = e.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus("error");
        setErrorMessage(err.message || "Failed to submit enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-green-800">Thank you!</h3>
        <p className="text-green-700">
          Your enquiry has been submitted successfully. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 rounded-lg bg-green-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
              errors.name ? "border-red-500" : "border-neutral-200"
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-neutral-700">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
              errors.phone ? "border-red-500" : "border-neutral-200"
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
            errors.email ? "border-red-500" : "border-neutral-200"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="projectInterestedIn" className="text-sm font-medium text-neutral-700">Project Interested In</label>
        <select
          id="projectInterestedIn"
          name="projectInterestedIn"
          value={formData.projectInterestedIn}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
        >
          <option value="">Select a project (Optional)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700">Your Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full resize-none rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
            errors.message ? "border-red-500" : "border-neutral-200"
          }`}
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      {submitStatus === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-neutral-900 px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-70 flex justify-center items-center"
      >
        {isSubmitting ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </form>
  );
}