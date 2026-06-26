import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPost } from "../../lib/posts";
import { cookies } from "next/headers";
import { BlogDetailClient } from "./BlogDetailClient";

const mdxComponents = {
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image src={src} alt={alt || ""} width={800} height={450} sizes="(max-width: 767px) 100vw, 700px" className="blog-detail-figure-img" />
    );
  },
  blockquote: ({ children }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote>{children}</blockquote>
  ),
};

export async function BlogDetail({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";

  const { content: contentEn } = await compileMDX({
    source: post.contentEn,
    components: mdxComponents,
    options: { mdxOptions: { development: false } },
  });

  const { content: contentZh } = await compileMDX({
    source: post.contentZh,
    components: mdxComponents,
    options: { mdxOptions: { development: false } },
  });

  const meta = {
    title: post.title,
    titleCn: post.titleCn,
    date: post.date,
    dateCn: post.dateCn,
  };

  return (
    <BlogDetailClient
      meta={meta}
      contentEn={contentEn}
      contentZh={contentZh}
      initialLang={lang}
    />
  );
}
