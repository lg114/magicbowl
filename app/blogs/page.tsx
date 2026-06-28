import { cookies } from "next/headers";
import { BlogPost } from "../components/cards/BlogPost";
import { DocumentTitle } from "../components/blog/DocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageTitle } from "../components/ui/PageTitle";
import { getAllPosts } from "../lib/posts";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? "博客" : "Blogs";
  const description = lang === "zh" ? "Gc 的想法和文字。" : "Gc's thoughts and writings.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function BlogsPage() {
  const posts = getAllPosts();
  return (
    <main className="page-shell">
      <div className="canvas">
        <DocumentTitle title="Blogs" titleCn="博客" />
        <Header />

        <PageTitle
          title="Blogs"
          titleCn="博客"
          sub="Thoughts and writings."
          subCn="我的想法和文字。"
        />

        <div className="blogs-grid">
          {posts.map((post) => (
            <BlogPost key={post.title} post={post} />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
