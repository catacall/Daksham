"use client";

import { useState } from "react";

interface BrochureCTAProps {
  brochureUrl?: string | null;
}

export default function BrochureCTA({ brochureUrl }: BrochureCTAProps) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("All fields are required.");
      return;
    }

    if (form.phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: "Requested home page brochure download.",
          source: "brochure-download",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setSuccess(true);
      
      // Trigger PDF/image download
      const targetUrl = brochureUrl || "/placeholder-project.jpg";
      const link = document.createElement("a");
      link.href = targetUrl;
      link.setAttribute("download", "Daksham_Developers_Brochure");
      link.click();

      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: "", email: "", phone: "" });
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-navy">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="bg-linear-to-r from-navy-light/40 to-navy-light/10 border border-gold/20 rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 sm:space-y-8 backdrop-blur-md shadow-2xl relative">
          {/* Subtle golden corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-3xl pointer-events-none" />

          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-gold block">
              Premium E-Brochure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium uppercase tracking-wide text-white">
              Discover Daksham Developments
            </h2>
            <p className="font-sans text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Download our comprehensive project portfolio containing floor plans, site master layouts, pricing options, and complete specification sheets.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center rounded-xl bg-gold px-8 py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-navy transition-all duration-300 hover:bg-gold-light hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-gold/10"
            >
              📥 Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-border-light overflow-hidden p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-navy text-xl font-bold w-8 h-8 rounded-full border border-border-light/50 flex items-center justify-center hover:bg-off-white transition-all"
            >
              ×
            </button>

            <div className="text-center space-y-2">
              <span className="text-2xl">📋</span>
              <h3 className="font-display text-xl font-bold text-navy uppercase tracking-wide">
                Download Brochure
              </h3>
              <p className="text-xs text-muted font-sans">
                Please enter your details to receive the e-brochure.
              </p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3">
                <span className="text-4xl animate-bounce block">✨</span>
                <h4 className="font-sans text-base font-bold text-emerald-600">
                  Thank You!
                </h4>
                <p className="text-xs text-muted">
                  Your download has started.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold">
                    ⚠️ {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="10-digit mobile number"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gold hover:bg-gold-light text-navy font-bold text-xs sm:text-sm uppercase tracking-widest py-4 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? "Processing..." : "Submit & Download"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
