import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostBySlug } from "../../../lib/posts";
import { siteConfig } from "../../../lib/site";

export const runtime = "edge";

const BRAND_COLOR = "#8ab4f8";
const BG = "#000000";
const INK = "#f2f2f2";
const META = "#6b6b6b";

const FONT_PATHS = {
  inter400: "/fonts/inter-400.ttf",
  inter700: "/fonts/inter-700.ttf",
  notoSC400: "/fonts/noto-sc-400.ttf",
  notoSC700: "/fonts/noto-sc-700.ttf",
};

let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[] | null = null;

async function loadFonts(origin: string) {
  if (fonts) return;
  const [i400, i700, n400, n700] = await Promise.all([
    fetch(`${origin}${FONT_PATHS.inter400}`).then((r) => r.arrayBuffer()),
    fetch(`${origin}${FONT_PATHS.inter700}`).then((r) => r.arrayBuffer()),
    fetch(`${origin}${FONT_PATHS.notoSC400}`).then((r) => r.arrayBuffer()),
    fetch(`${origin}${FONT_PATHS.notoSC700}`).then((r) => r.arrayBuffer()),
  ]);
  fonts = [
    { name: "Inter", data: i400, weight: 400, style: "normal" },
    { name: "Inter", data: i700, weight: 700, style: "normal" },
    { name: "Noto Sans SC", data: n400, weight: 400, style: "normal" },
    { name: "Noto Sans SC", data: n700, weight: 700, style: "normal" },
  ];
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  await loadFonts(url.origin);

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

  return new ImageResponse(
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
      fonts: fonts!,
    },
  );
}
