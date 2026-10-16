import Link from "next/link";

// 左上角站点标识：大写 G / C 上下叠印（与右上角导航同为固定位 chrome）。
// 整块即链接，点击回到首页。
export default function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Back to home">
      <span className="brand__glyph">G</span>
      <span className="brand__glyph">C</span>
    </Link>
  );
}
