import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_FILE = path.join(process.cwd(), "lib", "posts-data.json");

interface PostFrontmatter {
  title?: string;
  date?: string | Date;
  category?: string;
  tags?: string[];
  excerpt?: string;
}

interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
  html: string;
  headings: { id: string; text: string; level: number }[];
}

function toISODate(d: string | Date | undefined): string {
  if (!d) return "";
  if (typeof d === "string") {
    const parsed = new Date(d);
    if (Number.isNaN(parsed.getTime())) return d;
    d = parsed;
  }
  if (d instanceof Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return "";
}

function estimateReadingTime(md: string): number {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|]/g, " ");
  const cjk = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latin = (text.replace(/[\u3400-\u9fff]/g, " ").match(/[A-Za-z0-9'’]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + latin / 220));
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript\s*:/gi, "");
}

function applyMdxTransforms(html: string): string {
  html = html.replace(/<(h[23])>(.*?)<\/\1>/gi, (_, tag: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugifyHeading(text);
    return `<${tag} id="${id}"><a class="post__heading-anchor" href="#${id}" aria-label="复制本节链接">#</a>${inner}</${tag}>`;
  });

  html = html.replace(
    /<a\s+href="(https?:\/\/[^"]+)"/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  );

  html = html.replace(/<blockquote>/gi, '<blockquote class="post__quote">');
  html = html.replace(/<pre>/gi, '<pre class="post__codeblock">');

  html = optimizeImages(html);

  return html;
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<(h[23])\s+id="([^"]+)"[^>]*>(.*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1].charAt(1));
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").replace(/^#/, "").trim();
    if (text) headings.push({ id, text, level });
  }
  return headings;
}

function optimizeImages(html: string): string {
  return html.replace(
    /<img\s([^>]*)src="([^"]+)"([^>]*)>/gi,
    (_match, before: string, src: string, after: string) => {
      let optimizedSrc = src;
      if (!src.startsWith("/_next/image") && !src.endsWith(".svg")) {
        optimizedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1280&q=75`;
      }
      let attrs = `${before}src="${optimizedSrc}"${after}`;
      if (!/\bloading=/.test(attrs)) attrs = `loading="lazy" ${attrs}`;
      if (!/\bdecoding=/.test(attrs)) attrs = `decoding="async" ${attrs}`;
      return `<img ${attrs}>`;
    },
  );
}

marked.setOptions({ gfm: true, breaks: false });

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

const posts: PostData[] = files.map((file): PostData => {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw) as { data: PostFrontmatter; content: string };

  const rawHtml = marked.parse(content) as string;
  const html = sanitizeHtml(applyMdxTransforms(rawHtml));
  const headings = extractHeadings(html);

  return {
    slug,
    title: data.title ?? slug,
    date: toISODate(data.date),
    category: data.category ?? "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    readingTime: estimateReadingTime(content),
    html,
    headings,
  };
});

posts.sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${posts.length} posts → ${OUT_FILE}`);
