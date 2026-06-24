import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost } from "../lib/posts";

type BlogDetailProps = {
  post: BlogPost;
  lang: "en" | "zh";
};

const mdxComponents = {
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image src={src} alt={alt || ""} width={800} height={450} sizes="(max-width: 767px) 100vw, 700px" className="blog-detail-figure-img" />
    );
  },
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote>{children}</blockquote>
  ),
};

export function BlogDetail({ post, lang }: BlogDetailProps) {
  const title = lang === "zh" ? post.titleCn : post.title;
  const date = lang === "zh" ? post.dateCn : post.date;
  const content = lang === "zh" ? post.contentZh : post.contentEn;

  return (
    <article className="blog-detail">
      <Link href="/blogs" className="blog-detail-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{lang === "zh" ? "返回" : "Back"}</span>
      </Link>

      <header className="blog-detail-header">
        <h1 className="blog-detail-title">{title}</h1>
        <time className="blog-detail-date">{date}</time>
      </header>

      <div className="blog-detail-body">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}
