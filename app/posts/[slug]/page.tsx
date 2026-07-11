import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "../../../lib/posts";
import { formatDate } from "../../../lib/post-types";

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
  return { title: post.title, description: post.excerpt };
}

// 文章详情页：玻璃面板承载 markdown 正文（next-mdx-remote/rsc 渲染），
// 顶部带返回归档页的链接。背景沿用全局萤火虫 + 网格。
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="post-wrap">
      <article className="post">
        <Link href="/posts" className="post__back">
          ← 返回文章
        </Link>
        <div className="post__meta">
          <time className="card__date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="card__cat">{post.category}</span>
        </div>
        <h1 className="post__title">{post.title}</h1>
        <div className="post__body">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
