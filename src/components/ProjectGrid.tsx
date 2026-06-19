import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        No projects found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id || project.slug} project={project} />
      ))}
    </div>
  );
}
