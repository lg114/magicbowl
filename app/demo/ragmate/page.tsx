import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../../../lib/site";

export const metadata: Metadata = {
  title: "RagMate - Case Study",
  description: "RAG Q&A over your own documents, with cited answers and retrieval visualization.",
  alternates: { canonical: `${siteConfig.url}/demo/ragmate` },
  openGraph: {
    title: "RagMate - Case Study",
    description: "RAG Q&A over your own documents, with cited answers.",
    type: "website",
    images: [{ url: "/api/og?title=RagMate", width: 1200, height: 630, alt: "RagMate" }],
  },
};

export default function RagMatePage() {
  return (
    <main className="case-study">
      <div className="cards__inner">
        <Link href="/demo" className="case-study__back">
          ← Demo
        </Link>

        <header className="case-study__header">
          <h1 className="case-study__title">RagMate</h1>
          <p className="case-study__subtitle">
            RAG Q&A over your own documents, with cited answers.
          </p>
        </header>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Overview</h2>
          <p>
            RagMate is a document-grounded question answering system built on RAG (Retrieval-Augmented Generation).
            Upload your PDFs, ask questions in natural language, and get answers with inline citations
            pointing to the exact source and page number.
          </p>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Key Features</h2>
          <ul className="case-study__features">
            <li>
              <strong>Citation tracing</strong> — Every answer includes inline citations with source filename and page number. Click to jump to the source card.
            </li>
            <li>
              <strong>Retrieval visualization</strong> — Expand the retrieval details panel to see candidate chunks, scores, and filtering thresholds.
            </li>
            <li>
              <strong>Multi-document support</strong> — Upload multiple PDFs; the system chunks, embeds, and indexes them for cross-document search.
            </li>
            <li>
              <strong>Grounding control</strong> — Answers are marked as confident, hedged, or refused based on retrieval evidence.
            </li>
            <li>
              <strong>Session history</strong> — Conversations are persisted and can be resumed or deleted.
            </li>
          </ul>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Tech Stack</h2>
          <div className="case-study__stack">
            <div className="case-study__stack-col">
              <h3>Frontend</h3>
              <ul>
                <li>Vanilla HTML/CSS/JS — no build step, no dependencies</li>
                <li>SSE streaming for real-time token delivery</li>
                <li>Dark/light mode via <code>prefers-color-scheme</code></li>
                <li>Bilingual UI (zh/en) with localStorage persistence</li>
              </ul>
            </div>
            <div className="case-study__stack-col">
              <h3>Backend</h3>
              <ul>
                <li>Python / FastAPI</li>
                <li>pgvector for dense retrieval (cosine similarity)</li>
                <li>TitlePath chunking for structured PDF parsing</li>
                <li>OpenAI-compatible chat completions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Screenshots</h2>
          <div className="case-study__screenshots">
            <figure className="case-study__screenshot">
              <img
                src="/demo/ragmate/chat.webp"
                alt="RagMate chat answer listing the four NIST SP 800-218 SSDF practice groups, with numbered citation bubbles and source cards that name the PDF and page."
                width={1440}
                height={1005}
              />
              <figcaption>Chat interface with citation bubbles</figcaption>
            </figure>
            <figure className="case-study__screenshot">
              <img
                src="/demo/ragmate/documents.webp"
                alt="RagMate document panel listing three ingested NIST PDFs, each marked ingested with its chunk count."
                width={1440}
                height={424}
              />
              <figcaption>Document management panel</figcaption>
            </figure>
            <figure className="case-study__screenshot">
              <img
                src="/demo/ragmate/retrieval.webp"
                alt="RagMate retrieval details expanded, showing candidate chunks with reranker scores, the score threshold, and how many candidates were filtered out."
                width={1440}
                height={2054}
              />
              <figcaption>Retrieval details (debug view)</figcaption>
            </figure>
          </div>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Source</h2>
          <a
            className="case-study__repo"
            href="https://github.com/lg114/RagMate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            lg114/RagMate
          </a>
        </section>
      </div>
    </main>
  );
}
