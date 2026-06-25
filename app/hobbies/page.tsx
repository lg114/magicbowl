import { HobbyList } from "../components/HobbyList";
import { DocumentTitle } from "../components/DocumentTitle";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { hobbies } from "../lib/hobbies";

export async function generateMetadata() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? "爱好" : "Hobbies";
  const description = lang === "zh" ? "Gc 空闲时喜欢做的事。" : "What Gc enjoys off the screen.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function HobbiesPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <DocumentTitle title="Hobbies" titleCn="爱好" />
        <Header activeItem="Hobbies" />

        <PageTitle
          title="Hobbies"
          titleCn="爱好"
          sub="What I enjoy off the screen."
          subCn="空闲时，我喜欢做的事。"
        />

        <HobbyList hobbies={hobbies} />

        <Footer />
      </div>
    </main>
  );
}
