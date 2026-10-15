"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type PostMeta, formatDate } from "../types/post";

// 3D 抽屉文件柜：把最近 8 篇文章做成抽屉里的文件夹，置于首页「最近文章」上方。
// 移植自单文件 demo「3D 抽屉文件夹」：动画内核不变（rAF + 弹簧 + 相机缓动），
// 样式收敛到 styles/drawer.css 的 .drawer-shelf 作用域，并接入站点明暗双主题。
// client component：3D 交互全部在浏览器侧；文章数据由 server 端 page.tsx 传入。

const W = 380, H = 130, D = 330, Wc = 420, Hc = 190, GAP = 36;
const TAB_X = [14, 122, 230]; // 标签页三种错位位置，避免相邻文件夹 tab 重叠

interface CamState {
  rx: number;
  ry: number;
  tx: number;
  ty: number;
}

interface AnimState {
  o: number; // 当前开合度（弹簧输出）
  ov: number; // 弹簧速度
  ot: number; // 目标开合度 0..1
  sel: number; // 选中的文件夹下标，-1 无
  hov: number; // 悬停的文件夹下标，-1 无
  px: number; // 视差：指针相对视口中心 -1..1
  py: number;
  cam: CamState;
  rect: { w: number; h: number }; // 视口尺寸（ResizeObserver 维护）
  drag: { y: number; o0: number; moved: boolean } | null;
}

// 生成一个 3D 面（柜体/抽屉的板子）：宽高 + 空间变换
function faceStyle(w: number, h: number, tf: string): React.CSSProperties {
  return {
    width: w,
    height: h,
    margin: `${-h / 2}px 0 0 ${-w / 2}px`,
    transform: tf,
  };
}

export default function DrawerShelf({ posts }: { posts: PostMeta[] }) {
  const items = posts.slice(0, 8);
  const [sel, setSel] = useState(-1);

  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const folderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const S = useRef<AnimState>({
    o: 0,
    ov: 0,
    ot: 0,
    sel: -1,
    hov: -1,
    px: 0,
    py: 0,
    cam: { rx: -35, ry: -45, tx: 0, ty: 0 },
    rect: { w: 0, h: 0 },
    drag: null,
  });

  // 每篇文章在抽屉里的基准纵深（与原 demo 一致：-D/2+44 起，GAP 递增）
  const baseZ = (i: number) => -D / 2 + 44 + i * GAP;

  const layout = () => {
    const s = S.current;
    folderRefs.current.forEach((f, i) => {
      if (!f) return;
      // 悬停时前后文件夹各让开 14px，模拟翻看档案的手感
      const dz =
        s.hov >= 0 && s.sel < 0 ? (i > s.hov ? 14 : i < s.hov ? -14 : 0) : 0;
      const y = s.sel === i ? -150 : s.hov === i && s.sel < 0 ? -22 : 0;
      f.style.setProperty("--y", y + "px");
      f.style.setProperty(
        "--z",
        baseZ(i) + dz + (s.sel === i ? 30 : 0) + "px"
      );
    });
    if (hintRef.current) {
      hintRef.current.textContent =
        s.ot > 0.5 ? "点击文件夹查看，Esc 合上抽屉" : "向下拖动抽屉，或点击拉手";
    }
  };

  const doSel = (i: number) => {
    const s = S.current;
    s.sel = i;
    s.hov = -1;
    setSel(i);
    layout();
  };

  // 抽屉没开够时先自动弹开，再选中（等弹簧把抽屉送出来）
  const pick = (i: number) => {
    const s = S.current;
    if (s.ot < 0.5) {
      s.ot = 1;
      layout();
      setTimeout(() => doSel(i), 420);
    } else {
      doSel(i);
    }
  };

  const close = () => {
    S.current.sel = -1;
    setSel(-1);
    layout();
  };

  const setOpen = (v: number) => {
    const s = S.current;
    s.ot = v;
    if (!v && s.sel >= 0) close();
    layout();
  };

  useEffect(() => {
    const s = S.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const drawer = drawerRef.current;
    if (!viewport || !stage || !drawer) return;

    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 视口尺寸：相机缩放/选中态平移都以此为基准
    const measure = () => {
      const r = viewport.getBoundingClientRect();
      s.rect.w = r.width;
      s.rect.h = r.height;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);

    const onPointerMove = (e: PointerEvent) => {
      if (RM) return;
      s.px = (e.clientX / window.innerWidth - 0.5) * 2;
      s.py = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (s.sel >= 0) close();
        else setOpen(0);
      }
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("keydown", onKeyDown);

    let raf = 0;
    const frame = () => {
      // 抽屉开合：弹簧模拟，有惯性回弹感
      if (RM) s.o = s.ot;
      else {
        s.ov += (s.ot - s.o) * 0.085;
        s.ov *= 0.8;
        s.o += s.ov;
      }
      const wide = s.rect.w > 800;
      // 选中文件夹时相机转向正视，并给详情面板让位
      const t: CamState =
        s.sel >= 0
          ? {
              rx: -10,
              ry: -14,
              tx: wide ? -s.rect.w * 0.14 : 0,
              ty: wide ? 0 : -90,
            }
          : { rx: -35, ry: -45, tx: s.o * 100, ty: -s.o * 60 };
      const k = RM ? 1 : 0.08;
      (Object.keys(t) as (keyof CamState)[]).forEach((n) => {
        s.cam[n] += (t[n] - s.cam[n]) * k;
      });
      const sc = Math.min(1, s.rect.w / 640, s.rect.h / 700);
      stage.style.transform = `translate3d(${s.cam.tx}px, ${s.cam.ty}px, 0) scale(${sc}) rotateX(${
        s.cam.rx - s.py * 3
      }deg) rotateY(${s.cam.ry + s.px * 5}deg)`;
      drawer.style.transform = `translate3d(0, 30px, ${
        Math.max(-0.02, s.o) * 290
      }px)`;
      raf = requestAnimationFrame(frame);
    };
    layout();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) return null;

  const selPost = sel >= 0 ? items[sel] : null;

  return (
    <section className={"drawer-shelf" + (sel >= 0 ? " sel" : "")}>
      <div className="cards__inner">
        <h2 className="cards__heading">文件抽屉</h2>
      </div>
      <div
        className="ds-viewport"
        ref={viewportRef}
        onClick={() => {
          if (S.current.sel >= 0) close();
        }}
      >
        <div className="ds-scene">
          <div className="ds-stage" ref={stageRef}>
            <div className="ds-shadow" />
            <div className="ds-cab">
              <div
                className="ds-face ds-cab-back"
                style={faceStyle(Wc, Hc, `translateZ(${-D / 2}px)`)}
              />
              <div
                className="ds-face ds-cab-left"
                style={faceStyle(D, Hc, `rotateY(-90deg) translateZ(${Wc / 2}px)`)}
              />
              <div
                className="ds-face ds-cab-floor"
                style={faceStyle(Wc, D, `rotateX(90deg) translateZ(${-Hc / 2}px)`)}
              />
              <div
                className="ds-face ds-cab-right"
                style={faceStyle(D, Hc, `rotateY(90deg) translateZ(${Wc / 2}px)`)}
              />
            </div>
            <div className="ds-drawer" ref={drawerRef}>
              <div
                className="ds-face ds-d-back"
                style={faceStyle(W, H, `translateZ(${-D / 2}px)`)}
              />
              <div
                className="ds-face ds-d-left"
                style={faceStyle(D, H, `rotateY(-90deg) translateZ(${W / 2}px)`)}
              />
              <div
                className="ds-face ds-d-floor"
                style={faceStyle(W, D, `rotateX(90deg) translateZ(${-H / 2}px)`)}
              />
              <div
                className="ds-face ds-d-right"
                style={faceStyle(D, H, `rotateY(90deg) translateZ(${W / 2}px)`)}
              />
              <div
                className="ds-face ds-d-front"
                style={faceStyle(W, H, `translateZ(${D / 2}px)`)}
                role="button"
                tabIndex={0}
                aria-label="拉开或合上抽屉"
                onPointerDown={(e) => {
                  S.current.drag = { y: e.clientY, o0: S.current.ot, moved: false };
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  const d = S.current.drag;
                  if (!d) return;
                  const dy = e.clientY - d.y;
                  if (Math.abs(dy) > 4) d.moved = true;
                  if (d.moved)
                    S.current.ot = Math.min(1, Math.max(0, d.o0 + dy / 200));
                }}
                onPointerUp={() => {
                  const d = S.current.drag;
                  if (!d) return;
                  setOpen(d.moved ? (S.current.ot > 0.4 ? 1 : 0) : S.current.ot > 0.5 ? 0 : 1);
                  S.current.drag = null;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(S.current.ot > 0.5 ? 0 : 1);
                  }
                }}
              />
              {items.map((post, i) => (
                <div
                  key={post.slug}
                  ref={(el) => {
                    folderRefs.current[i] = el;
                  }}
                  className="ds-folder"
                  data-category={post.category}
                  role="button"
                  tabIndex={0}
                  aria-label={post.title}
                  style={
                    {
                      "--tx": TAB_X[i % 3] + "px",
                      "--z": baseZ(i) + "px",
                    } as React.CSSProperties
                  }
                  onPointerEnter={() => {
                    if (S.current.ot > 0.3 && S.current.sel < 0) {
                      S.current.hov = i;
                      layout();
                    }
                  }}
                  onPointerLeave={() => {
                    if (S.current.hov === i) {
                      S.current.hov = -1;
                      layout();
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (S.current.sel === i) close();
                    else pick(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (S.current.sel === i) close();
                      else pick(i);
                    }
                  }}
                >
                  <span className="ds-folder__tab">{post.title}</span>
                  <h3>{post.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="ds-hint" ref={hintRef} />
        <aside
          className="ds-panel"
          aria-live="polite"
          onClick={(e) => e.stopPropagation()}
        >
          {selPost && (
            <>
              <h2 className="ds-panel__title">{selPost.title}</h2>
              <p className="ds-panel__meta">
                {formatDate(selPost.date)} · {selPost.category}
              </p>
              <p className="ds-panel__excerpt">
                {selPost.excerpt || "这篇文章还没有写摘要。"}
              </p>
              <div className="ds-panel__actions">
                <Link className="ds-panel__link" href={`/posts/${selPost.slug}`}>
                  阅读全文 →
                </Link>
                <button type="button" className="ds-panel__btn" onClick={close}>
                  放回抽屉
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
