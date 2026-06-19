import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";

export const metadata = {
  title: "Hobbies — magicbowl",
  description: "What Gc enjoys off the screen.",
};

export default function HobbiesPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Hobbies" />

        <PageTitle
          title="Hobbies"
          titleCn="爱好"
          sub="What I enjoy off the screen."
          subCn="空闲时，我喜欢做的事。"
        />

        <Footer />
      </div>
    </main>
  );
}
