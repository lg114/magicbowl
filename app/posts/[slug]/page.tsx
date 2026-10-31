import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "../../../lib/posts";
import { siteConfig } from "../../../lib/site";
import { formatMonthDay } from "../../../types/post";
import PostBody from "../../../components/PostBody";
import TableOfContents from "../../../components/TableOfContents";

// 仅允许构建期已知的 slug：generateStaticParams 已枚举全部合法文章，
// 任何未预渲染的路径直接 404，阻断 URL 注入 ../ 等逃逸 content/posts 的路径穿越。
export const dynamicParams = false;

// 静态生成所有文章详情页
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const postUrl = `${siteConfig.url}/posts/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: siteConfig.author, url: siteConfig.social.github }],
    // Open Graph：文章类型，社交平台展示完整预览
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
      images: [{ url: `/api/og?slug=${slug}`, width: 1200, height: 630, alt: post.title }],
    },
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/api/og?slug=${slug}`],
    },
  };
}

// 文章详情页：单栏阅读布局（居中、无面板）。
// 头部 = 大号标题 + 日期/阅读时长；正文由构建时预编译的 HTML 直接渲染。
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const postUrl = `${siteConfig.url}/posts/${slug}`;

  return (
    <>
      <TableOfContents headings={post.headings} />
      <main className="post-wrap">
        <article className="post">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                datePublished: post.date,
                author: { "@type": "Person", name: siteConfig.author },
                description: post.excerpt,
                url: postUrl,
                image: `${siteConfig.url}/api/og?slug=${slug}`,
              }).replace(/</g, "\\u003c"),
            }}
          />
          <header>
            <h1 className="post__title">{post.title}</h1>
            <p className="post__meta">
              <time dateTime={post.date}>{formatMonthDay(post.date)}</time>
              <span className="post__meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{post.readingTime} min</span>
            </p>
          </header>

          <PostBody html={post.html} />

          <Link href="/posts" className="post__back">
            ← Back
          </Link>
        </article>
      </main>
    </>
  );
}
