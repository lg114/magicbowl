import Link from "next/link";
import { ragmateCaseStudy } from "../lib/case-studies";
import { siteConfig } from "../lib/site";

// RagMate 案例正文。/demo/ragmate 与 /projects/ragmate 共用，只是返回链接不同。
export default function RagMateCaseStudy({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  const repo = siteConfig.projects.find((project) => project.slug === ragmateCaseStudy.slug)?.repo;

  return (
    <main className="case-study">
      <div className="cards__inner">
        <Link href={backHref} className="case-study__back">{`← ${backLabel}`}</Link>

        <header className="case-study__header">
          <h1 className="case-study__title">{ragmateCaseStudy.title}</h1>
          <p className="case-study__subtitle">{ragmateCaseStudy.summary}</p>
        </header>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Overview</h2>
          <p>
            RagMate is a document-grounded question answering system built on RAG (Retrieval-Augmented Generation).
            Upload documents — PDF, DOCX, TXT, Markdown, PPTX, XLSX, CSV, HTML, and similar files —
            ask questions in natural language, and get answers with inline citations to the source file
            and, when the format has pages, the page number.
          </p>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Demo</h2>
          <figure className="case-study__screenshot">
            <video
              controls
              muted
              playsInline
              preload="metadata"
            >
              <source src="/demo/ragmate/card.webm" type="video/webm" />
              <source src="/demo/ragmate/card.mp4" type="video/mp4" />
            </video>
            <figcaption>A question, the cited answer, then the retrieval details.</figcaption>
          </figure>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Key Features</h2>
          <ul className="case-study__features">
            <li>
              <strong>Citation tracing</strong> — Cited answers include the source filename and, when the file has pages, the page number. Click a citation to jump to its source card.
            </li>
            <li>
              <strong>Retrieval visualization</strong> — Expand the retrieval details panel to see candidate chunks, scores, and filtering thresholds.
            </li>
            <li>
              <strong>Multi-document support</strong> — Upload more than one file. They are chunked, embedded, and searched together.
            </li>
            <li>
              <strong>Grounding control</strong> — When retrieval evidence is thin, the answer is flagged as low-confidence, or refused when nothing relevant was found.
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
                <li>Dark theme</li>
                <li>Chinese and English UI strings, chosen from the browser language</li>
              </ul>
            </div>
            <div className="case-study__stack-col">
              <h3>Backend</h3>
              <ul>
                <li>Python / FastAPI</li>
                <li>Hybrid retrieval: pgvector HNSW dense search plus BM25, RRF fusion, cross-encoder rerank, and a dynamic relevance threshold</li>
                <li>Title-path chunking for Markdown; PDFs keep page numbers</li>
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
          {repo ? (
            <a className="case-study__repo" href={repo} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              lg114/RagMate
            </a>
          ) : null}
        </section>
      </div>
    </main>
  );
}
