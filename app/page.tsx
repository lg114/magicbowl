import { cookies } from "next/headers";
import { BentoGrid } from "./components/BentoGrid";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { getAllPosts } from "./lib/posts";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? "首页" : "Home";
  const description =
    lang === "zh"
      ? "Gc 的个人主页和数字花园。"
      : "Gc's personal homepage and digital garden.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header />
        <BentoGrid posts={posts} />
        <Footer />
      </div>
    </main>
  );
}
