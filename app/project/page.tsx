import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";

export const metadata = {
  title: "Project — magicbowl",
  description: "Things Gc has built.",
};

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

        <Footer />
      </div>
    </main>
  );
}
