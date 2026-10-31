import type { Metadata } from "next";
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
    name: "Coming soon",
    desc: "实验性原型会陆续出现在这里。",
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
            <div key={d.name} className="demo-item">
              <h3 className="demo-item__name">{d.name}</h3>
              <p className="demo-item__desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
