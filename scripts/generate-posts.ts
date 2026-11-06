import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { createHighlighter } from "shiki";
import sharp from "sharp";

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

async function applyMdxTransforms(html: string): Promise<string> {
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

  html = await optimizeImages(html);

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

// 站内本地图片才探尺寸：public/ 下读得到的文件加 width/height，
// 让浏览器在图片加载前预留位置（防 CLS）。远端图片与 SVG 不动；
// 探不到时不让构建失败，只留警告，图片按原来方式输出。
async function probeLocalImageSize(src: string): Promise<{ width: number; height: number } | null> {
  if (!src.startsWith("/") || src.startsWith("/_next/image") || src.endsWith(".svg")) return null;
  try {
    const file = path.join(process.cwd(), "public", src);
    const meta = await sharp(file).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch (error) {
    console.warn(`Image size probe failed for ${src}:`, error);
  }
  return null;
}

async function optimizeImages(html: string): Promise<string> {
  const pattern = /<img\s([^>]*)src="([^"]+)"([^>]*)>/gi;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const [whole, before, src, after] = match;
    result += html.slice(lastIndex, match.index);
    let optimizedSrc = src;
    if (!src.startsWith("/_next/image") && !src.endsWith(".svg")) {
      optimizedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1280&q=75`;
    }
    let attrs = `${before}src="${optimizedSrc}"${after}`;
    if (!/\bloading=/.test(attrs)) attrs = `loading="lazy" ${attrs}`;
    if (!/\bdecoding=/.test(attrs)) attrs = `decoding="async" ${attrs}`;
    if (!/\bwidth=/.test(attrs) && !/\bheight=/.test(attrs)) {
      const size = await probeLocalImageSize(src);
      if (size) attrs = `width="${size.width}" height="${size.height}" ${attrs}`;
    }
    result += `<img ${attrs}>`;
    lastIndex = match.index + whole.length;
  }
  result += html.slice(lastIndex);
  return result;
}

// ---- 代码高亮（构建期 Shiki，零客户端 JS） ----
// 主题 github-dark：标准配色。Shiki 输出的 pre 自带深色背景，
// 这里去掉背景色声明，让代码块继续用正站安静的 pre 底色与边框，
// 只保留 token 颜色。未知语言时保留原样，不让整站构建失败。

const HIGHLIGHT_LANGS = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "json",
  "jsonc",
  "bash",
  "shell",
  "shellscript",
  "python",
  "go",
  "rust",
  "sql",
  "css",
  "html",
  "xml",
  "yaml",
  "toml",
  "markdown",
  "diff",
  "dockerfile",
  "plaintext",
  "text",
  "c",
  "cpp",
  "java",
  "kotlin",
  "swift",
  "lua",
];

type HighlighterInstance = Awaited<ReturnType<typeof createHighlighter>>;

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function styleHighlight(highlighted: string, lang: string): string {
  return highlighted
    .replace('<pre class="shiki github-dark"', '<pre class="shiki github-dark post__codeblock"')
    .replace(/<pre /, `<pre data-language="${lang}" `)
    .replace(/style="background-color:[^;"]+;?/, 'style="');
}

async function highlightCodeBlocks(html: string, highlighter: HighlighterInstance): Promise<string> {
  const pattern = /<pre><code(?: class="language-([\w+-]+)")?>([\s\S]*?)<\/code><\/pre>/gi;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const [whole, langAttr, escaped] = match;
    const lang = (langAttr ?? "plaintext").toLowerCase();
    result += html.slice(lastIndex, match.index);
    try {
      const code = decodeHtmlEntities(escaped);
      const highlighted = await highlighter.codeToHtml(code, { lang, theme: "github-dark" });
      result += styleHighlight(highlighted, lang);
    } catch {
      result += whole;
    }
    lastIndex = match.index + whole.length;
  }
  result += html.slice(lastIndex);
  return result;
}

async function main(): Promise<void> {
  marked.setOptions({ gfm: true, breaks: false });

  let highlighter: HighlighterInstance | null = null;
  try {
    highlighter = await createHighlighter({ themes: ["github-dark"], langs: HIGHLIGHT_LANGS });
  } catch (error) {
    console.warn("Shiki highlighter failed to load, code blocks will render unhighlighted:", error);
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts: PostData[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw) as { data: PostFrontmatter; content: string };

    const rawHtml = marked.parse(content) as string;
    const highlightedHtml = highlighter ? await highlightCodeBlocks(rawHtml, highlighter) : rawHtml;
    const html = sanitizeHtml(await applyMdxTransforms(highlightedHtml));
    const headings = extractHeadings(html);

    posts.push({
      slug,
      title: data.title ?? slug,
      date: toISODate(data.date),
      category: data.category ?? "未分类",
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt ?? "",
      readingTime: estimateReadingTime(content),
      html,
      headings,
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated ${posts.length} posts → ${OUT_FILE}`);

  if (highlighter) highlighter.dispose();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
