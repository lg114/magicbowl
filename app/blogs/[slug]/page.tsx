import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { posts } from "../../lib/posts";
import { BlogDetail } from "../../components/BlogDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? post.titleCn : post.title;
  const desc = lang === "zh" ? post.excerptCn : post.excerpt;
  return {
    title: `${title} — magicbowl`,
    description: desc,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Blogs" />
        <BlogDetail post={post} />
        <Footer />
      </div>
    </main>
  );
}
