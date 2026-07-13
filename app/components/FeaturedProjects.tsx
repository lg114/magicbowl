import Link from "next/link";
import { siteConfig } from "../../lib/site";
import ProjectCard from "./ProjectCard";

// 首页精选项目：文章卡片区下方的小块，展示 featured 项目并引流到 /projects。
// server component，直接读 siteConfig 生成静态 HTML。
export default function FeaturedProjects() {
  const featured = siteConfig.projects.filter((p) => p.featured);
  if (featured.length === 0) return null;

  return (
    <section className="featured-projects" id="projects">
      <div className="cards__inner">
        <h2 className="cards__heading">项目</h2>
        <div className="featured-grid">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
        <Link className="cards__more" href="/projects">
          查看全部 {siteConfig.projects.length} 个项目 →
        </Link>
      </div>
    </section>
  );
}
