import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_FILE = path.join(process.cwd(), "lib", "posts-data.json");

function toISODate(d) {
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

function estimateReadingTime(md) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|]/g, " ");
  const cjk = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latin = (text.replace(/[\u3400-\u9fff]/g, " ").match(/[A-Za-z0-9'’]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + latin / 220));
}

// 标题 slug：与 lib/mdx.ts 的 slugifyHeading 逻辑一致
function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// 复制 MdxComponents 的行为：h2/h3 加锚点、外链加 target/rel、blockquote/pre 加 class
function applyMdxTransforms(html) {
  // h2/h3: 提取文本作为 id，插入锚点链接
  html = html.replace(/<(h[23])>(.*?)<\/\1>/gi, (_, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugifyHeading(text);
    return `<${tag} id="${id}"><a class="post__heading-anchor" href="#${id}" aria-label="复制本节链接">#</a>${inner}</${tag}>`;
  });

  // 外链：加 target="_blank" rel="noopener noreferrer"
  html = html.replace(/<a\s+href="(https?:\/\/[^"]+)"/gi, '<a href="$1" target="_blank" rel="noopener noreferrer"');

  // blockquote: 加 class
  html = html.replace(/<blockquote>/gi, '<blockquote class="post__quote">');

  // pre: 加 class
  html = html.replace(/<pre>/gi, '<pre class="post__codeblock">');

  // img: 加 loading/decoding
  html = html.replace(/<img\s/gi, '<img loading="lazy" decoding="async" ');

  return html;
}

// 配置 marked：不包裹外层 <p>（保持与 MDXRemote 一致的输出）
marked.setOptions({ gfm: true, breaks: false });

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

const posts = files.map((file) => {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // 构建时编译 Markdown → HTML，并应用 MdxComponents 的变换
  const rawHtml = marked.parse(content);
  const html = applyMdxTransforms(rawHtml);

  return {
    slug,
    title: data.title ?? slug,
    date: toISODate(data.date),
    category: data.category ?? "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    readingTime: estimateReadingTime(content),
    content,
    html,
  };
});

posts.sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${posts.length} posts → ${OUT_FILE}`);
