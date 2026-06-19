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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-accent/30 bg-accent/5 p-8 text-center"
      >
        <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-wider text-accent">Thank you!</h3>
        <p className="font-sans text-muted">
          Your enquiry has been submitted successfully. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-8 rounded-xl bg-foreground px-8 py-3 font-sans text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-foreground"
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
      className="space-y-6 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-background px-4 py-3.5 font-sans text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
              errors.name ? "border-red-500" : "border-border"
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs font-sans text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-background px-4 py-3.5 font-sans text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
              errors.phone ? "border-red-500" : "border-border"
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-xs font-sans text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-background px-4 py-3.5 font-sans text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
            errors.email ? "border-red-500" : "border-border"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-xs font-sans text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="projectInterestedIn" className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">Project Interested In</label>
        <select
          id="projectInterestedIn"
          name="projectInterestedIn"
          value={formData.projectInterestedIn}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 font-sans text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        >
          <option value="">Select a project (Optional)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">Your Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full resize-none rounded-xl border bg-background px-4 py-3.5 font-sans text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
            errors.message ? "border-red-500" : "border-border"
          }`}
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-xs font-sans text-red-500">{errors.message}</p>}
      </div>

      {submitStatus === "error" && (
        <div className="rounded-xl bg-red-50 p-4 font-sans text-sm text-red-600 border border-red-100">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-foreground px-6 py-4 font-sans text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-accent hover:text-foreground disabled:opacity-70 flex justify-center items-center shadow-lg shadow-foreground/10 active:scale-95"
      >
        {isSubmitting ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-background border-r-transparent" />
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </motion.form>
  );
}