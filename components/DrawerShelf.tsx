"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type PostMeta, formatDate } from "../types/post";

// 3D 抽屉文件柜：把最近 8 篇文章做成抽屉里的文件夹，置于首页「最近文章」上方。
// 移植自单文件 demo「3D 抽屉文件夹」：rAF 驱动 + 定时长缓动 + 相机缓动，
// 样式收敛到 styles/drawer.css 的 .drawer-shelf 作用域，并接入站点明暗双主题。
// client component：3D 交互全部在浏览器侧；文章数据由 server 端 page.tsx 传入。
//
// ⚠️ 动效不受系统「减少动态效果」影响：抽屉、镜头、文件夹的动画一律播放，
//    仅「鼠标视差」在 prefers-reduced-motion 下关闭（见下方 REDUCE）。
//    此前整套动效都被 reduced-motion 短路成「瞬间跳到终点」，导致调参看似无效。

const W = 380, H = 130, D = 330, Wc = 420, Hc = 190, GAP = 36;
const TAB_X = [14, 122, 230]; // 标签页三种错位位置，避免相邻文件夹 tab 重叠
const DRAWER_TRAVEL = 290; // 抽屉全开的 Z 位移

// 抽屉开合时长（ms）—— 唯一的节奏旋钮。改这一个数即可整体调快慢：
// 1000 = 干脆利落 / 1500 = 当前 / 3000 = 慢速展示
// 拖拽松手时按「剩余行程比例」缩放，短距离不会白等满时长。
const OPEN_MS = 1500;

// 缓动曲线：慢起 → 中段加速 → 末端几乎停稳（末端约 0.4% 的极轻过冲，约 1px）。
// 长时程下比弹簧的明显回弹更耐看；需要「磕一下」的物理感时把 y2 调大即可。
const EASE = cubicBezier(0.5, 0, 0.3, 1.08);

// 纸张惯性增益：开合加速度的幅值与 OPEN_MS² 成反比（时长减半 → 加速度 ×4），
// 故增益按 OPEN_MS² 反向归一，保证只改时长时文件夹的倾角峰值基本不变
// （基准 12000 是在 OPEN_MS=3000 下实测标定的）
const TILT_GAIN = 12000 * (OPEN_MS / 3000) ** 2;

// 三次贝塞尔缓动求值（等价于 CSS cubic-bezier，用牛顿迭代由 x 反解 t）
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const C = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 10; i++) {
      const err = calc(t, x1, x2) - x;
      if (Math.abs(err) < 1e-6) break;
      const d = slope(t, x1, x2);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return calc(t, y1, y2);
  };
}

interface CamState {
  rx: number;
  ry: number;
  tx: number;
  ty: number;
}

interface Tween {
  from: number;
  to: number;
  t0: number;
  dur: number;
}

interface AnimState {
  prog: number; // 当前开合度（缓动输出），0..1
  ot: number; // 目标开合度（拖拽时由指针连续改写）
  tween: Tween | null; // 进行中的补间；拖拽时置空
  prevProg: number; // 上一帧开合度（算速度用）
  vel: number; // 平滑速度（归一化：每 60fps 帧的行程占比）
  prevVel: number;
  acc: number; // 平滑加速度：驱动文件夹纸张惯性
  tilt: number; // 文件夹容器倾角（deg）
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
  const foldersRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const folderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const S = useRef<AnimState>({
    prog: 0,
    ot: 0,
    tween: null,
    prevProg: 0,
    vel: 0,
    prevVel: 0,
    acc: 0,
    tilt: 0,
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

  // 从当前位置补间到目标：时长按剩余行程等比缩放（最少 260ms）
  const startTween = (to: number) => {
    const s = S.current;
    const dist = Math.abs(to - s.prog);
    s.ot = to;
    if (dist < 0.001) {
      s.tween = null;
      return;
    }
    s.tween = {
      from: s.prog,
      to,
      t0: performance.now(),
      dur: Math.max(260, OPEN_MS * dist),
    };
  };

  const doSel = (i: number) => {
    const s = S.current;
    s.sel = i;
    s.hov = -1;
    setSel(i);
    layout();
  };

  // 抽屉没开够时先自动拉开，拉开过半后再选中（不必等整个 3 秒走完）
  const pick = (i: number) => {
    const s = S.current;
    if (s.ot < 0.5) {
      const dist = Math.abs(1 - s.prog);
      startTween(1);
      layout();
      setTimeout(() => doSel(i), Math.max(260, OPEN_MS * dist * 0.6));
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
    if (!v && s.sel >= 0) close();
    startTween(v);
    layout();
  };

  useEffect(() => {
    const s = S.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const drawer = drawerRef.current;
    if (!viewport || !stage || !drawer) return;

    // 仅用于关闭鼠标视差；抽屉/镜头/文件夹动效不受系统设置影响（见文件头说明）
    const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      if (REDUCE) return;
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
    let last = performance.now();
    const frame = (now: number) => {
      // 帧率无关化：以 60fps 为基准步长，高刷屏不会变快变慢；
      // dt 封顶 2 帧，避免切后台回来动画跳变
      const dt = Math.min(2, Math.max(0.25, (now - last) / 16.667));
      last = now;

      // 1) 抽屉开合：定时长缓动。拖拽时直接跟手；否则按 tween 走缓动曲线。
      //    缓动曲线本身慢起慢收（速度两端趋零），所以不存在「起步被猛拽」
      //    的顿挫，也不需要额外的指令平滑。
      if (s.drag) {
        s.prog = s.ot;
      } else if (s.tween) {
        const p = Math.min(1, (now - s.tween.t0) / s.tween.dur);
        s.prog = s.tween.from + (s.tween.to - s.tween.from) * EASE(p);
        if (p >= 1) {
          s.prog = s.tween.to;
          s.tween = null;
        }
      }

      // 2) 由开合度求速度/加速度（两级平滑，避免逐帧噪声），驱动纸张惯性
      const v = (s.prog - s.prevProg) / dt;
      s.prevProg = s.prog;
      s.vel += (v - s.vel) * (1 - Math.pow(0.55, dt));
      const da = (s.vel - s.prevVel) / dt;
      s.prevVel = s.vel;
      s.acc += (da - s.acc) * (1 - Math.pow(0.6, dt));

      // 3) 纸张惯性：抽拉时文件夹随加速度微微后仰、停稳时回正，
      //    给「一叠纸被抽出来」一点重量感（上限 3.5°，克制不抢戏）
      if (foldersRef.current) {
        const targetTilt = Math.max(-3.5, Math.min(3.5, s.acc * TILT_GAIN));
        s.tilt += (targetTilt - s.tilt) * (1 - Math.pow(0.85, dt));
        foldersRef.current.style.transform = `rotateX(${s.tilt.toFixed(3)}deg)`;
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
          : // 抽屉打开时相机轻微右移上移：右移把「抽屉向左下方伸出」的构图偏移
            // 拉回来；上移是必需的，否则全开时抽屉底边会超出视口下沿被裁掉
            { rx: -35, ry: -45, tx: s.prog * 80, ty: -s.prog * 85 };
      const k = 1 - Math.pow(0.945, dt);
      (Object.keys(t) as (keyof CamState)[]).forEach((n) => {
        s.cam[n] += (t[n] - s.cam[n]) * k;
      });

      const sc = Math.min(1, s.rect.w / 640, s.rect.h / 700);
      stage.style.transform = `translate3d(${s.cam.tx}px, ${s.cam.ty}px, 0) scale(${sc}) rotateX(${
        s.cam.rx - s.py * 3
      }deg) rotateY(${s.cam.ry + s.px * 5}deg)`;
      drawer.style.transform = `translate3d(0, 30px, ${
        Math.max(-0.02, s.prog) * DRAWER_TRAVEL
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
                  const st = S.current;
                  st.tween = null; // 接管动画：拖拽期间直接跟手
                  st.drag = { y: e.clientY, o0: st.prog, moved: false };
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
                  const st = S.current;
                  const d = st.drag;
                  if (!d) return;
                  setOpen(d.moved ? (st.ot > 0.4 ? 1 : 0) : st.ot > 0.5 ? 0 : 1);
                  st.drag = null;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(S.current.ot > 0.5 ? 0 : 1);
                  }
                }}
              />
              <div className="ds-folders" ref={foldersRef}>
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
