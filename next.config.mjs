/** @type {import('next').NextConfig} */
import { createRequire } from "module";

// Bundle analyzer 是 devDependency；生产部署常不装 devDep，
// 故用 createRequire 同步探测，缺失则静默降级，避免 next.config 加载即崩。
let withBundleAnalyzer = (config) => config;
try {
  const mod = createRequire(import.meta.url)("@next/bundle-analyzer");
  const factory = mod.default || mod;
  withBundleAnalyzer = factory({ enabled: process.env.ANALYZE === "true" });
} catch {
  // 包未安装：跳过 bundle 分析，正常构建
}

const nextConfig = {
  // Allow LAN access to dev resources (HMR websocket etc.)
  allowedDevOrigins: ["192.168.1.14"],
  // Turbopack: CJS ESM interop for next-mdx-remote (see next.js#64525)
  transpilePackages: ["next-mdx-remote"],
  // App Router: packages using Node built-ins must be external
  serverExternalPackages: ["gray-matter"],
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280],
    imageSizes: [120, 200, 400, 600],
  },
  // Security: remove X-Powered-By header
  poweredByHeader: false,
  // Enable gzip compression
  compress: true,
  // Security headers
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    // 开发模式下 React/Turbopack HMR 需要 eval()（调试、重建调用栈等）；
    // 生产模式 React 从不使用 eval，保持严格 CSP，不放开 'unsafe-eval'。
    const scriptSrc = isDev
      ? "'self' 'unsafe-inline' 'unsafe-eval'"
      : "'self' 'unsafe-inline'";
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // 强制 HTTPS，防协议降级（localhost 自动忽略；前提全站一直 HTTPS）
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP：站点纯静态、仅同源资源；'unsafe-inline' 用于内联主题脚本 +
          // Next.js App Router 的 RSC/hydration 内联脚本（去掉会白屏）。
          // 仅同源，无外链脚本/字体/图片，MDX 走 rsc 不注入脚本。
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`,
          },
        ],
      },
      // 静态资源长缓存：仅 public/ 下的图片与图标。
      // 不含 /_next/static —— Next 已自动加 immutable；
      // 不含 /sw.js —— Service Worker 必须能及时拉到新版，不能长缓存。
      {
        source: "/avatar.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
