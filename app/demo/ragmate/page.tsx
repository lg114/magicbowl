import type { Metadata } from "next";
import RagMateCaseStudy from "../../../components/RagMateCaseStudy";
import { caseStudyMetadata, ragmateCaseStudy } from "../../../lib/case-studies";
import { siteConfig } from "../../../lib/site";

export const metadata: Metadata = caseStudyMetadata(
  ragmateCaseStudy,
  "/demo/ragmate",
  siteConfig.url,
);

export default function RagMatePage() {
  return <RagMateCaseStudy backHref="/demo" backLabel="Demo" />;
}
