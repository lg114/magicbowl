import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  titleCn: string;
  sub: string;
  subCn: string;
  excerpt: string;
  excerptCn: string;
  date: string;
  dateCn: string;
};

export type BlogPost = BlogPostMeta & {
  contentEn: string;
  contentZh: string;
};

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

export const getAllPosts = cache((): BlogPostMeta[] => {
  const slugs = fs.readdirSync(BLOGS_DIR).filter((dir) =>
    fs.statSync(path.join(BLOGS_DIR, dir)).isDirectory()
  );

  return slugs
    .map((slug) => {
      const enPath = path.join(BLOGS_DIR, slug, "en.mdx");
      const zhPath = path.join(BLOGS_DIR, slug, "zh.mdx");

      if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) return null;

      const en = matter(fs.readFileSync(enPath, "utf-8"));
      const zh = matter(fs.readFileSync(zhPath, "utf-8"));

      return {
        slug,
        title: en.data.title ?? "",
        titleCn: zh.data.title ?? "",
        sub: en.data.sub ?? "",
        subCn: zh.data.sub ?? "",
        excerpt: en.data.excerpt ?? "",
        excerptCn: zh.data.excerpt ?? "",
        date: en.data.date ?? "",
        dateCn: zh.data.date ?? "",
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by date descending (most recent first)
      const dateA = new Date(a!.date);
      const dateB = new Date(b!.date);
      return dateB.getTime() - dateA.getTime();
    }) as BlogPostMeta[];
});

export const getPost = cache((slug: string): BlogPost | null => {
  const enPath = path.join(BLOGS_DIR, slug, "en.mdx");
  const zhPath = path.join(BLOGS_DIR, slug, "zh.mdx");

  if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) return null;

  const enFile = matter(fs.readFileSync(enPath, "utf-8"));
  const zhFile = matter(fs.readFileSync(zhPath, "utf-8"));

  return {
    slug,
    title: enFile.data.title ?? "",
    titleCn: zhFile.data.title ?? "",
    sub: enFile.data.sub ?? "",
    subCn: zhFile.data.sub ?? "",
    excerpt: enFile.data.excerpt ?? "",
    excerptCn: zhFile.data.excerpt ?? "",
    date: enFile.data.date ?? "",
    dateCn: zhFile.data.date ?? "",
    contentEn: enFile.content,
    contentZh: zhFile.content,
  };
});
