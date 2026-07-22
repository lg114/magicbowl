import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createMdxComponents } from "../../components/MdxComponents";
import { getAllPosts, getPostBySlug, getPostSlugs } from "../../../lib/posts";
import { extractTocHeadings } from "../../../lib/mdx";
import { formatDate } from "../../../lib/post-types";

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

  const posts = getAllPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const newerPost = index > 0 ? posts[index - 1] : null;
  const olderPost = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const headings = extractTocHeadings(post.content);
  const mdxComponents = createMdxComponents();

  return (
    <main className="post-wrap">
      <div className="post-layout">
        <article className="post">
          <Link href="/posts" className="post__back">
            ← 返回文章
          </Link>
          <div className="post__meta">
            <time className="card__date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="card__cat" data-category={post.category}>
              {post.category}
            </span>
          </div>
          <h1 className="post__title">{post.title}</h1>
          {headings.length > 0 && (
            <nav className="post-toc post-toc--mobile" aria-label="文章目录">
              <p className="post-toc__title">目录</p>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id} className={`post-toc__item post-toc__item--h${heading.level}`}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="post__body">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
          {(olderPost || newerPost) && (
            <nav className="post-neighbors" aria-label="相邻文章">
              {olderPost ? (
                <Link className="post-neighbor" href={`/posts/${olderPost.slug}`}>
                  <span className="post-neighbor__label">上一篇</span>
                  <span className="post-neighbor__title">{olderPost.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newerPost && (
                <Link className="post-neighbor post-neighbor--next" href={`/posts/${newerPost.slug}`}>
                  <span className="post-neighbor__label">下一篇</span>
                  <span className="post-neighbor__title">{newerPost.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>
        {headings.length > 0 && (
          <aside className="post-toc post-toc--desktop" aria-label="文章目录">
            <p className="post-toc__title">目录</p>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id} className={`post-toc__item post-toc__item--h${heading.level}`}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </aside>
        )}
      </div>
    </main>
  );
}
