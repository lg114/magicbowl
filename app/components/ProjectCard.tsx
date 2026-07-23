import type { Project } from "../../lib/site";

// 状态 → 徽章样式（仅颜色区分，无位移/旋转，落在眩晕安全区）
const STATUS_CLASS: Record<Project["status"], string> = {
  活跃: "status status--active",
  进行中: "status status--wip",
  归档: "status status--archived",
};

// 项目卡片：玻璃底板 + 模糊，柔化背景网格、给焦点落脚。
// 纯展示，无客户端状态；hover 仅改边框/底色（颜色过渡）。
export default function ProjectCard({ project }: { project: Project }) {
  const statusClass = STATUS_CLASS[project.status];
  return (
    <article className="project-card">
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__desc">{project.desc}</p>
      <div className="project-card__tech">
        {project.tech.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="project-card__foot">
        <span className={statusClass}>{project.status}</span>
        <span className="project-card__links">
          {project.repo && (
            <a
              className="project-link"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              className="project-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              预览 ↗
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
