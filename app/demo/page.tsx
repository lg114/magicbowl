import type { Metadata } from "next";
import DemoCard from "../../components/DemoCard";
import { siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Demo",
  description: "实验性原型与交互演示合集。",
  alternates: { canonical: `${siteConfig.url}/demo` },
  openGraph: {
    title: "Demo - MagicBowl",
    description: "实验性原型与交互演示合集。",
    type: "website",
    images: [{ url: "/api/og?title=Demo", width: 1200, height: 630, alt: "Demo - MagicBowl" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo - MagicBowl",
    description: "实验性原型与交互演示合集。",
    images: ["/api/og?title=Demo"],
  },
};

const demos = [
  {
    name: "RagMate",
    desc: "RAG Q&A over your own documents, with cited answers.",
    href: "/demo/ragmate",
    image: {
      src: "/demo/ragmate/card-poster.webp",
      alt: "RagMate answer listing the four principles of explainable AI from NIST IR 8312, with numbered citation bubbles and a highlighted source card for page 4.",
    },
  },
];

export default function DemoPage() {
  return (
    <main className="demo">
      <div className="cards__inner">
        <header className="archive-page-header archive-page-header--center">
          <h1 className="archive-page-header__title">Demo</h1>
          <p className="archive-page-header__desc">Experiments and interactive prototypes.</p>
        </header>
        <div className="demo-list">
          {demos.map((d) => (
            <DemoCard
              key={d.name}
              name={d.name}
              desc={d.desc}
              href={d.href}
              image={d.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
