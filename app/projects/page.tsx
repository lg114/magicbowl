import type { Metadata } from "next";
import { siteConfig } from "../../lib/site";
import ProjectCard from "../../components/ProjectCard";

export const metadata: Metadata = {
  title: "项目",
};

// 项目页：复用归档页的 eyebrow + 标题风格，下方玻璃卡片网格展示全部项目。
export default function ProjectsPage() {
  const projects = siteConfig.projects;
  return (
    <main className="projects">
      <div className="cards__inner">
        <header className="archive-page-header">
          <span className="archive-page-header__eyebrow">作品</span>
          <h1 className="archive-page-header__title">我做过的一些东西</h1>
        </header>
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
