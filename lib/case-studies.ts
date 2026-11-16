import type { Metadata } from "next";

// 有足够材料（正文 + 真实截图）的项目案例。slug 与 siteConfig.projects 里的 slug 对应。
export const ragmateCaseStudy = {
  slug: "ragmate",
  title: "RagMate",
  description:
    "RAG Q&A over your own documents, with cited answers and retrieval visualization.",
  summary: "RAG Q&A over your own documents, with cited answers.",
} as const;

export const caseStudies = [ragmateCaseStudy];

export type CaseStudy = (typeof caseStudies)[number];

// 案例页的唯一路径。canonical 和 sitemap 都从这里取，避免两处各拼一次再走岔。
export function caseStudyPath(study: CaseStudy): string {
  return `/demo/${study.slug}`;
}

export function caseStudyMetadata(study: CaseStudy, siteUrl: string): Metadata {
  const title = `${study.title} - Case Study`;
  // 标题要进查询串，含空格或 & 时不编码会把参数截断。
  const ogImage = `/api/og?title=${encodeURIComponent(study.title)}`;
  return {
    title,
    description: study.description,
    alternates: { canonical: `${siteUrl}${caseStudyPath(study)}` },
    openGraph: {
      title,
      description: study.summary,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
      images: [ogImage],
    },
  };
}
