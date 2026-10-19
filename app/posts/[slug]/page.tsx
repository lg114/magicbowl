import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createMdxComponents } from "../../../components/MdxComponents";
import { getPostBySlug, getPostSlugs } from "../../../lib/posts";
import { formatMonthDay } from "../../../types/post";

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
  return { title: post.title, description: post.excerpt };
}

// 文章详情页：单栏阅读布局（居中、无面板）。
// 头部 = 大号标题 + 日期/阅读时长；正文由 next-mdx-remote 渲染。
// 章节导航不再用侧边目录，改为标题旁的 # 锚点（见 MdxComponents）。
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const mdxComponents = createMdxComponents();

  return (
    <main className="post-wrap">
      <article className="post">
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

        <div className="post__body">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <Link href="/posts" className="post__back">
          ← Back
        </Link>
      </article>
    </main>
  );
}
