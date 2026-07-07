// GitHub 贡献热力图 —— 占位版（无真实数据）
// 渲染一个 7 行 × 26 列的方块网格，用确定性伪随机生成不同强度，
// 视觉上模拟 GitHub 贡献图。后续接入真实数据时替换 level 计算即可。

const WEEKS = 26;
const DAYS = 7;

// 确定性伪随机：同一 (w, d) 永远得到相同强度，避免每次渲染跳动
function levelAt(w: number, d: number): number {
  const n = (w * 7 + d * 53 + ((w * d) % 11) * 17) % 23;
  if (n < 6) return 0;
  if (n < 11) return 1;
  if (n < 16) return 2;
  if (n < 20) return 3;
  return 4;
}

export default function GitHubHeatmap() {
  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => {
    const w = Math.floor(i / DAYS);
    const d = i % DAYS;
    return levelAt(w, d);
  });

  return (
    <div className="heatmap" role="img" aria-label="GitHub 贡献热力图（占位）">
      <div className="heatmap__grid">
        {cells.map((lv, i) => (
          <span key={i} className={`heatmap__cell heatmap__cell--l${lv}`} />
        ))}
      </div>
      <div className="heatmap__legend">
        <span>少</span>
        {[0, 1, 2, 3, 4].map((lv) => (
          <span key={lv} className={`heatmap__cell heatmap__cell--l${lv}`} />
        ))}
        <span>多</span>
      </div>
    </div>
  );
}
