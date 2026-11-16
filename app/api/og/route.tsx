import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostBySlug } from "../../../lib/posts";
import { siteConfig } from "../../../lib/site";

// Cloudflare Workers（OpenNext）不支持 Edge Runtime。声明
// `export const runtime = "edge"` 时，适配器把 edge-runtime 垫成空模块，
// 路由模块加载失败（interopDefault(undefined)），处理函数不会执行，
// 响应是 text/plain 的 “Internal Server Error”。Workers 本身已在边缘运行，
// 这里显式使用 Node.js runtime；OpenNext 会把 next/og 的 wasm 打进 worker。
export const runtime = "nodejs";

// 查询串决定画面内容，不能在构建期烘成一张静态图。
export const dynamic = "force-dynamic";

const BRAND_COLOR = "#b5b5b5";
const BG = "#000000";
const INK = "#f2f2f2";
const META = "#6b6b6b";

const FONT_FILES = {
  inter400: "fonts/inter-400.ttf",
  inter700: "fonts/inter-700.ttf",
  notoSC400: "fonts/noto-sc-400.ttf",
  notoSC700: "fonts/noto-sc-700.ttf",
} as const;

const FALLBACK_IMAGE = "og.png";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

// OpenNext 把 Cloudflare 上下文放在这个 symbol 上（与适配器 worker 入口一致）。
// 用 symbol 读取 ASSETS，避免让站点运行时依赖 @opennextjs/cloudflare 包。
const CLOUDFLARE_CONTEXT = Symbol.for("__cloudflare-context__");

type AssetsBinding = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

function assetsBinding(): AssetsBinding | undefined {
  const ctx = (globalThis as Record<symbol, { env?: { ASSETS?: AssetsBinding } } | undefined>)[
    CLOUDFLARE_CONTEXT
  ];
  return ctx?.env?.ASSETS;
}

// 部署后的 worker 不能 fetch 自己的域名（回环请求失败，字体一加载整条路由就 500）。
// 生产环境从 ASSETS 绑定读 public/；`next start` / 本地 Node 从磁盘读。
async function readPublicFile(relativePath: string): Promise<ArrayBuffer> {
  const assets = assetsBinding();
  if (assets) {
    try {
      const res = await assets.fetch(new URL(`/${relativePath}`, "https://assets.local"));
      if (res.ok) return await res.arrayBuffer();
      await res.body?.cancel();
    } catch {
      // ASSETS 绑定不可用时继续走磁盘（next start / 本地 Node）。
    }
  }

  const buf = await readFile(join(process.cwd(), "public", relativePath));
  const copy = new Uint8Array(buf.byteLength);
  copy.set(buf);
  return copy.buffer;
}

let fontsPromise: Promise<OgFont[]> | null = null;

function loadFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readPublicFile(FONT_FILES.inter400),
      readPublicFile(FONT_FILES.inter700),
      readPublicFile(FONT_FILES.notoSC400),
      readPublicFile(FONT_FILES.notoSC700),
    ])
      .then(([i400, i700, n400, n700]) => [
        { name: "Inter", data: i400, weight: 400 as const, style: "normal" as const },
        { name: "Inter", data: i700, weight: 700 as const, style: "normal" as const },
        { name: "Noto Sans SC", data: n400, weight: 400 as const, style: "normal" as const },
        { name: "Noto Sans SC", data: n700, weight: 700 as const, style: "normal" as const },
      ])
      .catch((error) => {
        fontsPromise = null;
        throw error;
      });
  }
  return fontsPromise;
}

function clamp(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

function pngResponse(body: ArrayBuffer, cacheControl: string) {
  return new Response(body, {
    headers: {
      "content-type": "image/png",
      "cache-control": cacheControl,
    },
  });
}

async function fallbackImage() {
  const png = await readPublicFile(FALLBACK_IMAGE);
  return pngResponse(png, "public, max-age=300");
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const fonts = await loadFonts();

    const slug = url.searchParams.get("slug");
    const overrideTitle = url.searchParams.get("title");

    let title = overrideTitle || siteConfig.title;
    let subtitle = siteConfig.description;
    let date = "";

    if (slug) {
      const post = getPostBySlug(slug);
      if (post) {
        title = post.title;
        subtitle = post.excerpt || subtitle;
        date = post.date;
      }
    }

    title = clamp(title, 120);
    subtitle = clamp(subtitle, 180);

    const image = new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: BG,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 72px",
            fontFamily: '"Inter", "Noto Sans SC", sans-serif',
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: BRAND_COLOR,
              }}
            />
            <span style={{ color: META, fontSize: "22px", letterSpacing: "2px" }}>
              {siteConfig.name.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              color: INK,
              fontSize: title.length > 30 ? "52px" : "64px",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-1px",
              marginBottom: "24px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                color: META,
                fontSize: "24px",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {subtitle}
            </div>
          )}

          {date && (
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                right: "72px",
                color: META,
                fontSize: "20px",
              }}
            >
              {date}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "72px",
              color: META,
              fontSize: "18px",
            }}
          >
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      },
    );

    const bytes = await image.arrayBuffer();
    return pngResponse(bytes, "public, max-age=86400");
  } catch (error) {
    console.error("OG image generation failed; serving static fallback", error);
    try {
      return await fallbackImage();
    } catch (fallbackError) {
      console.error("OG fallback image failed", fallbackError);
      return new Response("OG image unavailable", {
        status: 500,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  }
}
