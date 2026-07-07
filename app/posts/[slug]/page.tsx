import "../../styles/blog.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comments from "../../components/Comments";
import { getAllPosts, getPostBySlug, formatDate } from "../../../lib/posts";
import { siteConfig } from "../../../lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `${siteConfig.url}/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.author },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: `${siteConfig.url}/posts/${post.slug}`,
  };

  return (
    <main className="blog-shell blog-shell--single">
      <article className="post-detail">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="post-detail__meta">
          <span className="post-detail__category">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h1 className="post-detail__title">{post.title}</h1>
        <div className="post-detail__tags">
          {post.tags.map((t) => (
            <Link
              key={t}
              href={`/posts?tag=${encodeURIComponent(t)}`}
              className="tag-pill"
            >
              #{t}
            </Link>
          ))}
        </div>
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>
        <Comments />
        <Link href="/posts" className="back-link">
          ← 返回文章列表
        </Link>
      </article>
    </main>
  );
}
