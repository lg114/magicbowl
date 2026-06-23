"use client";

import Image from "next/image";
import { useLang } from "./LanguageContext";

export type Project = {
  title: string;
  titleCn?: string;
  sub?: string;
  subCn?: string;
  image?: string;
  note?: string;
  noteCn?: string;
  link?: string;
  linkCn?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useLang();
  const href = lang === "zh" ? (project.linkCn || project.link) : project.link;
  const title = lang === "zh" && project.titleCn ? project.titleCn : project.title;
  const sub = lang === "zh" ? (project.subCn || project.sub) : project.sub;
  const note = lang === "zh" && project.noteCn ? project.noteCn : project.note;

  return (
    <article className="project-card">
      <div className="project-card-header">
        <div className="project-card-meta">
          <span className="project-card-label">{lang === "zh" ? "项目" : "Project"}</span>
          {sub && (
            <>
              <span className="project-card-dot">·</span>
              <span className="project-card-sub">{sub}</span>
            </>
          )}
        </div>
        {href ? (
          <a
            className="project-card-arrow"
            href={href}
            target="_blank"
            rel="noreferrer"
            data-source="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ) : (
          <span className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        )}
      </div>

      {project.image && (
        <div className="project-card-cover">
          <Image src={project.image} alt={`${title} cover`} width={1280} height={720} sizes="(max-width: 767px) 100vw, 50vw" className="project-card-cover-img" />
        </div>
      )}

      <div className="project-card-info">
        <h3 className="project-card-title">{title}</h3>
        {note && <p className="project-card-note">{note}</p>}
      </div>
    </article>
  );
}
