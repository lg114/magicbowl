import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostBySlug } from "../../../lib/posts";
import { siteConfig } from "../../../lib/site";

export const runtime = "edge";

const BRAND_COLOR = "#8ab4f8";
const BG = "#000000";
const INK = "#f2f2f2";
const META = "#6b6b6b";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const overrideTitle = searchParams.get("title");

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
          fontFamily: "Inter, PingFang SC, sans-serif",
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
    },
  );
}
