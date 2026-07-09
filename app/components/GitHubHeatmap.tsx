"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── 类型 ───────────────────────────────────────────

export type ContributionDay = { date: string; count: number; level: number };

type Props = {
  data: ContributionDay[];
  year?: number;
  cellSize?: number;
};

// ─── 色阶 ───────────────────────────────────────────

const LIGHT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const DARK_COLORS  = ["#161b22", "#0e4429", "#006d32", "#26a641",  "#39d353"];

function getColor(level: number, dark: boolean): string {
  const palette = dark ? DARK_COLORS : LIGHT_COLORS;
  return palette[level] ?? palette[0];
}

// ─── 自适应尺寸常量 ─────────────────────────────────

const DEFAULT_CELL = 13;
const MIN_CELL = 8;
const MAX_CELL = 22;
const LABEL_WIDTH = 34;
const GAP = 3;

// ─── 布局与文案常量 ─────────────────────────────────

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;
const DAYS_IN_WEEK = 7;

// ─── 工具 ───────────────────────────────────────────

function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function dayOfWeek(d: Date): number {
  return d.getDay();
}

function startOfWeek(d: Date): Date {
  const r = new Date(d);
  r.setDate(r.getDate() - dayOfWeek(d));
  return r;
}

// ─── 网格构建 ───────────────────────────────────────

interface GridDay {
  date: string | null;
  count: number;
  level: number;
}

interface MonthLabel {
  text: string;
  colStart: number;
  span: number;
}

function buildGrid(
  data: ContributionDay[],
  year: number,
): { weeks: GridDay[][]; months: MonthLabel[]; total: number; streak: number } {
  const map = new Map<string, ContributionDay>();
  let total = 0;
  for (const d of data) {
    map.set(d.date, d);
    total += d.count;
  }

  const now = new Date();
  const yearEnd = new Date(year, 11, 31);
  const end = now < yearEnd ? now : yearEnd;
  const start = startOfWeek(new Date(year || now.getFullYear(), 0, 1));

  const weeks: GridDay[][] = [];
  const cur = new Date(start);
  let currentMonth = -1;
  let monthColStart = 0;
  const months: MonthLabel[] = [];

  let streak = 0;
  let maxStreak = 0;

  while (cur <= end) {
    const col: GridDay[] = [];
    for (let di = 0; di < DAYS_IN_WEEK; di++) {
      const d = new Date(cur);
      d.setDate(d.getDate() + di);
      const ds = fmt(d);

      if (d > end) {
        col.push({ date: null, count: 0, level: 0 });
      } else {
        const entry = map.get(ds);
        if (entry) {
          col.push({ date: ds, count: entry.count, level: entry.level });
          if (entry.count > 0) {
            streak++;
            if (streak > maxStreak) maxStreak = streak;
          } else {
            streak = 0;
          }
        } else {
          col.push({ date: ds, count: 0, level: 0 });
          streak = 0;
        }
      }

      const m = new Date(ds + "T00:00:00").getMonth();
      if (m !== currentMonth) {
        if (currentMonth >= 0 && weeks.length > monthColStart) {
          months.push({
            text: MONTHS[currentMonth],
            colStart: monthColStart,
            span: weeks.length - monthColStart,
          });
        }
        currentMonth = m;
        monthColStart = weeks.length;
      }
    }
    weeks.push(col);
    cur.setDate(cur.getDate() + 7);
  }

  if (currentMonth >= 0 && weeks.length > monthColStart) {
    months.push({
      text: MONTHS[currentMonth],
      colStart: monthColStart,
      span: weeks.length - monthColStart,
    });
  }

  return { weeks, months, total, streak: maxStreak };
}

// ─── Portal Tooltip ─────────────────────────────────

interface TipState {
  x: number;
  y: number;
  date: string;
  count: number;
}

function Tooltip({ tip }: { tip: TipState }) {
  return createPortal(
    <div
      className="gh-tip"
      style={{
        position: "fixed",
        left: tip.x,
        top: tip.y,
        transform: "translate(-50%, -100%)",
        marginTop: -8,
      }}
    >
      {new Date(tip.date + "T00:00:00").toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      })}
      <br />
      <span className="gh-cell__count">
        {tip.count > 0 ? `${tip.count} 次贡献` : "无贡献"}
      </span>
    </div>,
    document.body,
  );
}

// ─── 主组件 ─────────────────────────────────────────

export default function GitHubHeatmap({
  data,
  year = new Date().getFullYear(),
  cellSize = DEFAULT_CELL,
}: Props) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState<number>(cellSize);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const compute = () => {
      const { weeks } = buildGrid(data, year);
      if (weeks.length === 0) return;
      const available = el.clientWidth - LABEL_WIDTH;
      const totalGap = (weeks.length - 1) * GAP;
      const ideal = Math.floor((available - totalGap) / weeks.length);
      const size = Math.max(MIN_CELL, Math.min(MAX_CELL, ideal));
      setMeasured(size);
    };

    compute();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(compute);
      ro.observe(el);
    } else {
      window.addEventListener("resize", compute);
    }

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [data, year]);

  const size = Math.max(MIN_CELL, Math.min(MAX_CELL, measured || cellSize));

  const { weeks, months, total, streak } = useMemo(
    () => buildGrid(data, year),
    [data, year],
  );

  const [tip, setTip] = useState<TipState | null>(null);

  if (weeks.length === 0) {
    return (
      <div className="gh-heatmap">
        <p className="gh-empty">暂无 {year} 年贡献数据</p>
      </div>
    );
  }

  return (
    <div className="gh-heatmap">
      {tip && <Tooltip tip={tip} />}

      {/* Month labels */}
      <div className="gh-months">
        {months.map((m, i) => (
          <span
            key={i}
            className="gh-month"
            style={{
              width: `${m.span * (size + GAP) - GAP}px`,
              marginLeft: i > 0 ? `${GAP}px` : "0",
            }}
          >
            {m.text}
          </span>
        ))}
      </div>

      {/* Body: weekday labels + scrollable grid */}
      <div className="gh-body">
        <div className="gh-weekdays">
          {WEEKDAYS.map((day, i) => (
            <span
              key={day}
              className="gh-weekday"
              style={{ height: size }}
            >
              {i % 2 === 0 ? day : ""}
            </span>
          ))}
        </div>

        <div className="gh-scroll" ref={scrollRef}>
          <div className="gh-grid" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="gh-col" style={{ gap: GAP }}>
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className="gh-cell"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: getColor(day.level, dark),
                    }}
                    data-date={day.date || undefined}
                    data-level={day.level}
                    data-count={day.count || undefined}
                    onMouseEnter={(e) => {
                      if (!day.date) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      setTip({
                        x: r.left + r.width / 2,
                        y: r.top,
                        date: day.date,
                        count: day.count,
                      });
                    }}
                    onMouseLeave={() => setTip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend + total */}
      <div className="gh-legend">
        <div className="gh-legend__bar" aria-hidden="true">
          <span className="gh-legend__label">少</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className="gh-legend__swatch"
              style={{
                backgroundColor: getColor(lvl, dark),
                width: size,
                height: size,
              }}
            />
          ))}
          <span className="gh-legend__label">多</span>
        </div>
        <span className="gh-total">
          {total} 次贡献{streak > 0 ? ` · ${streak} 天连续` : ""}
        </span>
      </div>
    </div>
  );
}
