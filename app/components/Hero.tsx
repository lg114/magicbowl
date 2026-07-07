"use client";

import { useEffect, useRef } from "react";
import ScrollCue from "./ScrollCue";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let cooldown = false;

    const handleWheel = (e: WheelEvent) => {
      // 只拦截「向下滚动」——向上滚动交给浏览器正常处理。
      if (e.deltaY <= 0) return;

      // 仅当 hero 仍停留在视口中时才接管，离开 hero 后恢复页面原生滚动。
      const rect = hero.getBoundingClientRect();
      const heroStillVisible = rect.bottom > 1;
      if (!heroStillVisible) return;

      // 尊重「减少动态效果」偏好：直接跳转而非平滑滚动。
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 平滑滚动动画进行期间，忽略重复触发，避免抖动/反复打断。
      if (cooldown) {
        e.preventDefault();
        return;
      }

      const target = document.getElementById("main-content");
      if (!target) return;

      e.preventDefault();
      cooldown = true;
      if (reduce) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      // 平滑滚动大致结束后释放冷却，恢复正常滚轮行为。
      window.setTimeout(() => {
        cooldown = false;
      }, 800);
    };

    // 用原生非 passive 监听，确保 preventDefault 生效。
    hero.addEventListener("wheel", handleWheel, { passive: false });
    return () => hero.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <h1 className="home-title">MagicBowl</h1>
      <p className="home-sub">一个正在生长的地方</p>
      <ScrollCue />
    </section>
  );
}
