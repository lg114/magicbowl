import { HobbyList } from "../components/cards/HobbyList";
import { DocumentTitle } from "../components/blog/DocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageTitle } from "../components/ui/PageTitle";
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
        <Header />

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
