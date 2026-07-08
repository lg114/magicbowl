/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
      },
    ];
  },
};


export default nextConfig;
