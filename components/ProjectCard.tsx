import type { Project } from "../lib/site";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project-item"
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3 className="project-item__name">{project.name}</h3>
      <p className="project-item__desc">{project.desc}</p>
    </a>
  );
}
