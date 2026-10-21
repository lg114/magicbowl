"use client";

function optimize(html: string): string {
  return html.replace(
    /<img\s([^>]*)src="([^"]+)"([^>]*)>/gi,
    (_match, before: string, src: string, after: string) => {
      if (src.startsWith("/_next/image") || src.endsWith(".svg")) {
        return `<img ${before}src="${src}"${after}>`;
      }
      const optimized = `/_next/image?url=${encodeURIComponent(src)}&w=1280&q=75`;
      return `<img ${before}src="${optimized}"${after}>`;
    },
  );
}

export default function PostBody({ html }: { html: string }) {
  return (
    <div
      className="post__body"
      dangerouslySetInnerHTML={{ __html: optimize(html) }}
    />
  );
}
