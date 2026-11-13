import Link from "next/link";
import type { Project } from "../types/project";

const statusModifier: Record<Project["status"], string> = {
  active: "active",
  "working on": "working",
  archived: "archived",
};

export default function ProjectCard({ project }: { project: Project }) {
  const className = `project-item${project.image ? " project-item--media" : ""}`;
  const body = (
    <>
      {project.image ? (
        <span className="project-item__media">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
          />
        </span>
      ) : null}
      <span className="project-item__head">
        <h2 className="project-item__name">{project.name}</h2>
        <span className={`project-item__status project-item__status--${statusModifier[project.status]}`}>
          {project.status}
        </span>
      </span>
      <p className="project-item__desc">{project.desc}</p>
    </>
  );

  if (project.slug) {
    return (
      <Link className={className} href={`/projects/${project.slug}`}>
        {body}
      </Link>
    );
  }

  if (project.repo) {
    return (
      <a className={className} href={project.repo} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}
