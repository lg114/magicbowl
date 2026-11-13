import Link from "next/link";
import type { Project } from "../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <h2 className="project-item__name">{project.name}</h2>
      <p className="project-item__desc">{project.desc}</p>
    </>
  );

  if (project.slug) {
    return (
      <Link className="project-item" href={`/projects/${project.slug}`}>
        {body}
      </Link>
    );
  }

  if (project.repo) {
    return (
      <a className="project-item" href={project.repo} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return <div className="project-item">{body}</div>;
}
