"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "../../lib/site";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { giscus } = siteConfig;
  const configured = Boolean(giscus.repo && giscus.repoId);

  useEffect(() => {
    if (!configured || !ref.current) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-repo", giscus.repo);
    s.setAttribute("data-repo-id", giscus.repoId);
    s.setAttribute("data-category", giscus.category);
    s.setAttribute("data-category-id", giscus.categoryId);
    s.setAttribute("data-mapping", giscus.mapping);
    s.setAttribute(
      "data-reactions-enabled",
      giscus.reactionsEnabled ? "1" : "0"
    );
    s.setAttribute("data-theme", giscus.theme);
    s.setAttribute("data-emit-metadata", "0");
    ref.current.appendChild(s);
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [configured, giscus]);

  return (
    <section className="comments" id="comments">
      <h2 className="comments__title">评论</h2>
      {configured ? (
        <div ref={ref} className="giscus" />
      ) : (
        <div className="comments__placeholder">
          <p>
            评论区由{" "}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noreferrer noopener"
            >
              Giscus
            </a>{" "}
            驱动。
          </p>
          <p className="comments__hint">
            在 <code>lib/site.ts</code> 中填入 GitHub 仓库信息即可启用实时评论。
          </p>
        </div>
      )}
    </section>
  );
}
