import "../styles/blog.css";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: siteConfig.description,
};

export default function AboutPage() {
  const fullPath = path.join(process.cwd(), "content", "about.md");
  const file = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(file);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <main className="blog-shell blog-shell--single">
      <article className="post-detail about-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="prose">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}
