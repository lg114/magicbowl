"use client";

import { useEffect, useState } from "react";

// Site founding moment — kept in code only (no visible origin marker per spec).
const SITE_START = new Date("2026-06-19T00:00:00+08:00");

type Elapsed = { days: number; hours: number; mins: number; secs: number };

function getElapsed(): Elapsed {
  const ms = Date.now() - SITE_START.getTime();
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    mins: Math.floor((totalSec % 3600) / 60),
    secs: totalSec % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ClockBadge() {
  // null until mounted → avoids SSR/client hydration mismatch
  const [t, setT] = useState<Elapsed | null>(null);

  useEffect(() => {
    setT(getElapsed());
    const id = setInterval(() => setT(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock-badge" aria-label="站点已运行时间" title="MagicBowl 已运行时间">
      <span className="clock-dot" aria-hidden="true" />
      <span className="clock-text">
        已运行 {t ? t.days : "—"} 天
        {" "}
        {t ? `${pad(t.hours)}:${pad(t.mins)}:${pad(t.secs)}` : "--:--:--"}
      </span>
    </div>
  );
}
