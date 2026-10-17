import Link from "next/link";

// 左上角站点标识：G/C 单笔画 monogram，整块即「回到首页」链接。
// 入场用 stroke-dashoffset 让笔画自绘（pathLength="1" 把路径长度归一化，
// 这样不用在运行时测量 getTotalLength）。
export default function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Back to home">
      <svg
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
