/** @type {import('next').NextConfig} */
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
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};


export default nextConfig;
