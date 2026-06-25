import { DocumentTitle } from "../components/DocumentTitle";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../lib/projects";

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
        <DocumentTitle title="Project" titleCn="项目" />
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
