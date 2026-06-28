"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

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
  projects?: { id: string; title: string }[];
  preselectedProjectId?: string | null;
  defaultProject?: string;
  onSuccess?: () => void;
}

export function EnquiryForm({ projects = [], preselectedProjectId, defaultProject, onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    projectInterestedIn: preselectedProjectId || defaultProject || "",
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
      if (onSuccess) {
        onSuccess();
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectInterestedIn: "",
        message: "",
        source: "website",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[String(issue.path[0])] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus("error");
        setErrorMessage((err as Error).message || "Failed to submit enquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-sm border border-gold/30 bg-gold/5 p-6 sm:p-8 text-center"
      >
        <h3 className="mb-3 font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-gold">Thank you!</h3>
        <p className="font-sans text-muted text-sm sm:text-base font-medium">
          Your enquiry has been submitted successfully. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 sm:mt-8 rounded-sm bg-navy px-6 sm:px-8 py-3 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-gold hover:text-navy"
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="space-y-4 sm:space-y-6 rounded-sm border border-gold/20 bg-background p-5 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="name" className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-sm border bg-white px-3.5 sm:px-4 py-3 sm:py-3.5 font-sans text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all ${
              errors.name ? "border-red-500" : "border-border-light"
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs font-sans text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="phone" className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-sm border bg-white px-3.5 sm:px-4 py-3 sm:py-3.5 font-sans text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all ${
              errors.phone ? "border-red-500" : "border-border-light"
            }`}
            placeholder="+91 99675 56073"
          />
          {errors.phone && <p className="text-xs font-sans text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="email" className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-sm border bg-white px-3.5 sm:px-4 py-3 sm:py-3.5 font-sans text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all ${
            errors.email ? "border-red-500" : "border-border-light"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-xs font-sans text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="projectInterestedIn" className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">Project Interested In</label>
        <select
          id="projectInterestedIn"
          name="projectInterestedIn"
          value={formData.projectInterestedIn}
          onChange={handleChange}
          className="w-full rounded-sm border border-border-light bg-white px-3.5 sm:px-4 py-3 sm:py-3.5 font-sans text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
        >
          <option value="">Select a project (Optional)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="message" className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">Your Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full resize-none rounded-sm border bg-white px-3.5 sm:px-4 py-3 sm:py-3.5 font-sans text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all ${
            errors.message ? "border-red-500" : "border-border-light"
          }`}
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-xs font-sans text-red-500">{errors.message}</p>}
      </div>

      {submitStatus === "error" && (
        <div className="rounded-xl bg-red-50 p-3 sm:p-4 font-sans text-xs sm:text-sm text-red-600 border border-red-100">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-gold px-6 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy transition-all hover:bg-gold-light disabled:opacity-70 flex justify-center items-center shadow-md active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-navy border-r-transparent" />
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </motion.form>
  );
}