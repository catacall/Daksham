"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { ArrowRight, Inbox } from "lucide-react";
import { motion } from "framer-motion";

export interface ProjectGridProps {
  projects: Array<any>;
  currentFilter: "all" | "ongoing" | "delivered";
}

export default function ProjectGrid({ projects, currentFilter }: ProjectGridProps) {
  const tabs = [
    { label: "All Projects", id: "all", href: "/projects" },
    { label: "Ongoing", id: "ongoing", href: "/projects/ongoing" },
    { label: "Delivered", id: "delivered", href: "/projects/delivered" },
  ] as const;

  // Custom trigger for enquiry modal
  const openEnquiry = () => {
    const event = new CustomEvent("open-enquiry-modal");
    window.dispatchEvent(event);
  };

  return (
    <section className="flex-1 bg-background pt-24 md:pt-32 pb-20">
      {/* Banner Header */}
      <div className="bg-foreground text-background py-16 md:py-24 border-b border-accent/20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-accent font-medium uppercase tracking-wider mb-6"
          >
            {currentFilter === "all"
              ? "Luxurious Landmarks"
              : currentFilter === "ongoing"
              ? "Ongoing Developments"
              : "Delivered Landmarks"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated portfolio of ultra-premium residential and commercial properties, engineered to perfection.
          </motion.p>
        </div>
      </div>

      {/* Tabs and Grid Container */}
      <div className="container mx-auto px-6 mt-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16 border-b border-slate-200/60">
          <div className="flex gap-8 md:gap-12 overflow-x-auto pb-4 scrollbar-none">
            {tabs.map(tab => {
              const isActive = currentFilter === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`relative text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] pb-3 transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-accent font-extrabold"
                      : "text-slate-500 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-px left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl bg-slate-50 border border-slate-200/40 max-w-xl mx-auto flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
              <Inbox size={32} />
            </div>
            <h3 className="font-display text-2xl text-foreground font-semibold uppercase tracking-wider mb-3">
              No Projects Found
            </h3>
            <p className="font-sans text-slate-600 mb-8 max-w-sm">
              We are currently updating our portfolio. Check back shortly or contact our specialists for exclusive off-market listings.
            </p>
            <button
              onClick={openEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-foreground hover:bg-accent/90 transition-all duration-300 font-sans text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg"
            >
              Contact Our Desk
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
