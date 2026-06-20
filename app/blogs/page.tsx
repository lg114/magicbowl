import { BlogPost } from "../components/BlogPost";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { posts } from "../lib/posts";

export const metadata = {
  title: "Blogs — magicbowl",
  description: "Gc's thoughts and writings.",
};

export default function BlogsPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Blogs" />

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
