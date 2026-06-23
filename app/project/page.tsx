import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { ProjectCard, type Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    title: "RagMate",
    sub: "RAG",
    subCn: "RAG",
    image: "/projects/ragmate.png",
    note: "A Retrieval-Augmented Generation assistant that helps you chat with your own documents.",
    noteCn: "一个基于 RAG 的智能助手，让你能和自己的文档对话。",
    link: "https://github.com/lg114/RagMate",
  },
  {
    title: "Full Design Skill",
    sub: "Design System",
    subCn: "设计系统",
    note: "A comprehensive UI/UX design skill with 50+ styles, 161 color palettes, 57 font pairings, and 99 UX guidelines for building professional interfaces.",
    noteCn: "一个全面的 UI/UX 设计技能，包含 50+ 风格、161 种配色、57 种字体组合和 99 条 UX 准则，用于构建专业级界面。",
  },
];

export async function generateMetadata() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? "项目" : "Project";
  const description = lang === "zh" ? "Gc 做过的东西。" : "Things Gc has built.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function ProjectPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Project" />

        <PageTitle
          title="Project"
          titleCn="项目"
          sub="Things I've built."
          subCn="我做过的东西。"
        />

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
