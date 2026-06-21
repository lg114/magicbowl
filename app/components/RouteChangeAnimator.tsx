"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { useLang } from "./LanguageContext";

/**
 * Wraps page content and applies enter/exit CSS animations on
 * route change or language toggle.
 *
 * Exit  — current page shrinks to scale(0.98), fades out, drifts up.
 * Enter — new page rises from scale(0.96) + blur, settles into place.
 *
 * Animations are defined in globals.css (.page-enter / .page-exit).
 */
export default function RouteChangeAnimator({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { lang } = useLang();
  const prevPath = useRef(pathname);
  const prevLang = useRef(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanup = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("page-enter", "page-exit");
    el.removeEventListener("animationend", cleanup);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // First render — skip animation
    if (prevPath.current === pathname && prevLang.current === lang) {
      prevPath.current = pathname;
      prevLang.current = lang;
      return;
    }
    prevPath.current = pathname;
    prevLang.current = lang;

    // Remove stale classes, then force reflow before re-adding
    cleanup();
    void el.offsetWidth;

    el.classList.add("page-enter");
    el.addEventListener("animationend", cleanup, { once: true });

    return cleanup;
  }, [pathname, lang, cleanup]);

  return (
    <div ref={containerRef} className="page-transition-wrapper">
      {children}
    </div>
  );
}
