// 构建时运行：读取 content/posts/*.md，生成 lib/posts-data.json。
// Cloudflare Workers 运行时无法访问文件系统，所以把文章数据内联到 bundle 里。
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUTPUT = path.join(process.cwd(), "lib", "posts-data.json");

function toISODate(d: unknown): string {
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

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
const posts = files.map((file) => {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, file);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    date: toISODate(data.date),
    category: data.category ?? "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    readingTime: estimateReadingTime(content),
    content,
  };
});

fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2), "utf8");
console.log(`Generated ${OUTPUT} with ${posts.length} posts`);
