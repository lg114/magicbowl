import type { Project } from "../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project-item"
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="project-item__name">{project.name}</h2>
      <p className="project-item__desc">{project.desc}</p>
    </a>
  );
}
