"use client";
import { useEffect, useRef } from "react";

/**
 * Floating overlay scrollbar that never occupies layout space.
 * Replaces the native scrollbar on `html` with a thin CSS thumb
 * that sits on top of the page content.
 */
export default function OverlayScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const thumb = thumbRef.current!;
    const track = trackRef.current!;
    let dragging = false;
    let startY = 0;
    let startScroll = 0;

    function getDocHeight() {
      return Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
    }

    function update() {
      const docH = getDocHeight();
      const winH = window.innerHeight;
      if (docH <= winH) {
        thumb.style.display = "none";
        return;
      }
      thumb.style.display = "";

      const ratio = winH / docH;
      const thumbH = Math.max(24, winH * ratio);
      const scrollable = docH - winH;
      const scrollRatio = window.scrollY / scrollable;
      const trackH = track.clientHeight;
      const top = scrollRatio * (trackH - thumbH);

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${top}px)`;
    }

    function show() {
      thumb.classList.add("is-visible");
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        thumb.classList.remove("is-visible");
      }, 1200);
    }

    function onScroll() {
      update();
      show();
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      dragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
      e.preventDefault();
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const docH = getDocHeight();
      const winH = window.innerHeight;
      const scrollable = docH - winH;
      const trackH = track.clientHeight;
      const thumbH = thumb.offsetHeight;
      const scale = scrollable / (trackH - thumbH);
      window.scrollTo(0, startScroll + (e.clientY - startY) * scale);
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      timerRef.current = setTimeout(() => {
        thumb.classList.remove("is-visible");
      }, 1200);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    thumb.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      thumb.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 8,
        zIndex: 2147483647,
        pointerEvents: "none",
      }}
    >
      <div
        ref={thumbRef}
        className="overlay-scrollbar-thumb"
        style={{
          position: "absolute",
          top: 0,
          right: 2,
          width: 4,
          borderRadius: 9999,
          pointerEvents: "auto",
          opacity: 0,
          transition: "opacity 0.3s",
          background: "rgba(0,0,0,0.18)",
          cursor: "grab",
        }}
      />
    </div>
  );
}
