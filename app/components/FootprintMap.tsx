"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SiteConfig } from "../../lib/site";

// 高德 JS API 直接操作 window，必须客户端挂载（弹窗打开时才加载，首屏不进包）
const FootprintAmap = dynamic(() => import("./FootprintAmap"), {
  ssr: false,
  loading: () => <div className="globe-loading">正在加载地图…</div>,
});

export default function FootprintMap({
  footprints,
}: {
  footprints: SiteConfig["footprints"];
}) {
  const [open, setOpen] = useState(false);

  // Esc 关闭 + 打开时锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className="home-card home-card--footprints footprint-card"
        role="button"
        tabIndex={0}
        aria-label="查看足迹地图"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <h2 className="home-card__title">足迹</h2>
        <p className="footprint-quote">千里之行，始于足下</p>
        <span className="footprint-open-hint">点击查看世界地图 →</span>
      </div>

      {open && (
        <div
          className="globe-modal"
          role="dialog"
          aria-modal="true"
          aria-label="足迹地图"
          onClick={() => setOpen(false)}
        >
          <div
            className="globe-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="globe-modal__head">
              <span className="globe-modal__title">我的足迹</span>
              <button
                type="button"
                className="globe-modal__close"
                aria-label="关闭"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <FootprintAmap footprints={footprints} />
            <p className="globe-modal__tip">
              拖拽平移 · 滚轮缩放 · 悬停查看城市 · 底图由高德地图提供
            </p>
          </div>
        </div>
      )}
    </>
  );
}
