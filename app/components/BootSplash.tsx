"use client";

import { useEffect, useState } from "react";
import "../styles/loading.css";

/**
 * 启动动画（splash）：每次整页刷新时显示碗约 1.2s，随后淡出并卸载。
 * 复用 loading.css 里现成的碗动画（bowl-enter / bowl-bounce / bowl-float / bowl-shadow）。
 * 放在首页根节点即可——硬刷新时随页面挂载而显示。
 */
export default function BootSplash() {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // 显示约 1.2s 后开始淡出
    const exitTimer = setTimeout(() => setExiting(true), 1200);
    // 淡出（0.5s）结束后彻底卸载，避免遮挡后续交互
    const removeTimer = setTimeout(() => setHidden(true), 1750);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`bowl-loading${exiting ? " exit" : ""}`} aria-hidden="true">
      <div className="bowl-scene">
        <div className="bowl-float">
          <svg
            className="bowl-svg"
            width="160"
            height="100"
            viewBox="0 0 160 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bowl body */}
            <ellipse cx="80" cy="62" rx="60" ry="34" fill="#FFFFFF" />
            {/* Bowl rim / opening */}
            <ellipse cx="80" cy="38" rx="42" ry="16" fill="#333333" />
          </svg>
        </div>
        {/* Ground shadow - reacts opposite to the bounce */}
        <div className="bowl-shadow" />
      </div>
    </div>
  );
}
