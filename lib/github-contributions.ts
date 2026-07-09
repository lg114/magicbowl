// 服务端数据获取：抓取 GitHub 贡献页并解析逐日记录。
// 仅服务端引用，含 fetch + next revalidate，不会带入客户端打包。

export type ContributionDay = {
  date: string;  // YYYY-MM-DD
  count: number;
  level: number; // 0-4，对应 GitHub 的 data-level 属性
};

const USERNAME = "lg114";

const ROW_RE =
  /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*>[\s\S]*?<\/td>\s*<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g;

function parse(html: string): ContributionDay[] {
  const out: ContributionDay[] = [];
  let m: RegExpExecArray | null;
  ROW_RE.lastIndex = 0;
  while ((m = ROW_RE.exec(html)) !== null) {
    const date = m[1];
    const level = parseInt(m[2], 10);
    const tip = m[3].trim().toLowerCase();
    let count = 0;
    const mm = tip.match(/(\d+)\s+contributions/);
    if (mm) count = parseInt(mm[1], 10);
    out.push({ date, count, level });
  }
  return out;
}

/**
 * 抓取指定年份的 GitHub 贡献数据。
 * 通过 `?from=YYYY-01-01&to=YYYY-12-31` 限定日期范围，只返回当年记录。
 * - 成功：返回指定年份的逐日贡献数（含 level 0-4）
 * - 失败：返回空数组（组件层显示空状态）
 * fetch 缓存 1 小时，避免频繁请求 GitHub。
 */
export async function getContributions(year?: number): Promise<ContributionDay[]> {
  const y = year ?? new Date().getFullYear();
  const from = `${y}-01-01`;
  const to = `${y}-12-31`;

  try {
    const res = await fetch(
      `https://github.com/users/${USERNAME}/contributions?from=${from}&to=${to}`,
      {
        headers: { "User-Agent": "magicbowl-blog", Accept: "text/html" },
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const html = await res.text();
    return parse(html);
  } catch {
    return [];
  }
}
