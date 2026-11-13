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

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function caseStudyMetadata(study: CaseStudy, pathname: string, siteUrl: string): Metadata {
  const title = `${study.title} - Case Study`;
  return {
    title,
    description: study.description,
    alternates: { canonical: `${siteUrl}${pathname}` },
    openGraph: {
      title,
      description: study.summary,
      type: "website",
      images: [{ url: `/api/og?title=${study.title}`, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
      images: [`/api/og?title=${study.title}`],
    },
  };
}
