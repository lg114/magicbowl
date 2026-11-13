import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RagMateCaseStudy from "../../../components/RagMateCaseStudy";
import { caseStudies, caseStudyMetadata, getCaseStudy } from "../../../lib/case-studies";
import { siteConfig } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return caseStudyMetadata(study, `/projects/${study.slug}`, siteConfig.url);
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  if (study.slug === "ragmate") {
    return <RagMateCaseStudy backHref="/projects" backLabel="Projects" />;
  }

  notFound();
}
