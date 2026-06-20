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
];

export async function generateMetadata() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  return {
    title: lang === "zh" ? "项目 — magicbowl" : "Project — magicbowl",
    description: lang === "zh" ? "Gc 做过的东西。" : "Things Gc has built.",
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
