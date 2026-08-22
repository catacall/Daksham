"use client";

import { useEffect, useState } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const seen = sessionStorage.getItem("enquiry-popup-seen");
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("enquiry-popup-seen", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ project?: string }>;
      if (customEvent.detail?.project) {
        setSelectedProject(customEvent.detail.project);
      } else {
        setSelectedProject("");
      }
      setIsOpen(true);
    };
    window.addEventListener("open-enquiry-modal", handleOpen);
    return () => window.removeEventListener("open-enquiry-modal", handleOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="enquiry-modal"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 30, delay: 0.05 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-platinum p-5 sm:p-6 md:p-8 shadow-2xl shadow-navy/30 border border-border-light z-10"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute right-4 sm:right-5 top-4 sm:top-5 text-muted hover:text-navy transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </motion.button>

            <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-display font-medium text-navy uppercase tracking-normal">
              Enquire Now
            </h2>
            {selectedProject && (
              <p className="mb-4 text-xs sm:text-sm font-sans gold-gradient-text font-semibold uppercase tracking-normal">
                Interested in: {selectedProject}
              </p>
            )}

            <EnquiryForm
              defaultProject={selectedProject}
              onSuccess={() => setTimeout(() => setIsOpen(false), 2000)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
