"use client";

import { useEffect, useRef, useState } from "react";
import { loadAMap } from "../../lib/amap-loader";
import type { SiteConfig } from "../../lib/site";

type Footprint = SiteConfig["footprints"][number];

const STYLE_LIGHT = "normal"; // 高德标准样式（亮色主题）
const STYLE_DARK = "amap://styles/dark"; // 高德深色样式（暗色主题）

export default function FootprintAmap({
  footprints,
}: {
  footprints: SiteConfig["footprints"];
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let map: any = null;
    let alive = true;
    let observer: MutationObserver | null = null;

    loadAMap()
      .then((AMap: any) => {
        if (!alive || !host) return;

        const isLight =
          document.documentElement.getAttribute("data-theme") !== "dark";

        map = new AMap.Map(host, {
          zoom: 4,
          center: [108, 34], // [经度, 纬度]：中国地理中心附近（高德 center 为 [lng, lat]）
          viewMode: "2D",
          mapStyle: isLight ? STYLE_LIGHT : STYLE_DARK,
          showIndoorMap: false,
        });

        // 去过城市：光晕 + 爆发环 + 脉冲 + 核心点 + 常驻标签（城市间不连线）
        footprints.forEach((f: Footprint, i: number) => {
          const marker = new AMap.Marker({
            position: [f.lng, f.lat],
            anchor: "center",
            content:
              '<span class="city-marker" style="--i:' +
              i +
              '">' +
              '<span class="city-halo"></span>' +
              '<span class="city-burst"></span>' +
              '<span class="city-pulse"></span>' +
              '<span class="city-core"></span>' +
              '<span class="city-label">' +
              f.name +
              "</span>" +
              "</span>",
            title: `${f.name} · ${f.country}`,
            zIndex: 120,
          });
          map.add(marker);
        });

        map.on("complete", () => {
          if (!alive) return;
          setLoading(false);
          // 自动框选所有足迹点，保证初始视野落在有效范围内
          try {
            map.setFitView(undefined, false, [40, 40, 40, 40]);
          } catch {
            /* 部分版本无 setFitView 时静默降级 */
          }
          // 触发城市依次「爆发点亮」动画（按 --i 错峰）
          host.classList.add("city-markers--lit");
        });

        // 主题切换时同步底图样式
        observer = new MutationObserver(() => {
          const lt =
            document.documentElement.getAttribute("data-theme") !== "dark";
          map?.setMapStyle(lt ? STYLE_LIGHT : STYLE_DARK);
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
      })
      .catch((e: any) => {
        if (alive) {
          setError(e?.message || "高德地图加载失败");
          setLoading(false);
        }
      });

    return () => {
      alive = false;
      observer?.disconnect();
      try {
        map?.destroy?.();
      } catch {
        /* noop */
      }
    };
  }, [footprints]);

  return (
    <div className="map-layout">
      <div className="world-map-wrap">
        <div ref={hostRef} className="amap-host" />
        {loading && !error && (
          <div className="map-loading">正在加载地图…</div>
        )}
        {error && (
          <div className="globe-loading globe-loading--err">{error}</div>
        )}
      </div>
    </div>
  );
}
