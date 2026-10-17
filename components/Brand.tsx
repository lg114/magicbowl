"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 左上角站点标识：G/C 单笔画 monogram，整块即「回到首页」链接。
// 入场用 stroke-dashoffset 让笔画自绘（pathLength="1" 把路径长度归一化，
// 这样不用在运行时测量 getTotalLength）。
//
// 关键：Brand 挂在根布局里，客户端路由切换时不会重新挂载，CSS 动画只会在
// 首次加载时播一次。这里用 pathname 当 key —— 每次跳转 key 变化 → React 重建
// 这个 <svg> → 动画从头再来。所以每次跳转都能看到描线。
export default function Brand() {
  const pathname = usePathname();

  return (
    <Link className="brand" href="/" aria-label="Back to home">
      <svg
        key={pathname}
        className="brand__mark"
        viewBox="0 0 250 360"
        aria-hidden="true"
        focusable="false"
      >
        <path
          pathLength={1}
          d="M197,28 C130,22 25,70 25,155 C25,195 80,240 125,240 C175,240 220,210 220,170 C220,150 200,135 172,135 C120,135 80,180 70,230 C66,300 110,345 212,331"
        />
      </svg>
    </Link>
  );
}
