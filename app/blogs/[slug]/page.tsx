import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { getAllPosts, getPost } from "../../lib/posts";
import { BlogDetail } from "../../components/blog/BlogDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  const title = lang === "zh" ? post.titleCn : post.title;
  const description = lang === "zh" ? post.excerptCn : post.excerpt;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="page-shell">
      <div className="canvas">
        <Header />
        <BlogDetail slug={slug} />
        <Footer />
      </div>
    </main>
  );
}
