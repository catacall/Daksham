"use client";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

// Project type not required in this file; remove unused declaration

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

type Project = {
  id?: string | number;
  slug: string;
  title: string;
  location: string;
  status: "ongoing" | "delivered";
} & Record<string, unknown>;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-12 text-center text-muted font-sans">
        No projects found.
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {projects.map(project => (
        <ProjectCard key={project.id || project.slug} project={project} />
      ))}
    </motion.div>
  );
}
