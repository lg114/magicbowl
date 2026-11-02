// 纯类型与无副作用工具，独立成模块避免把 fs 等 Node API 打进浏览器包。
// 客户端组件（PostsArchive）只从这里取类型与 formatMonthDay。

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  /** 预计阅读分钟数（中文 400 字/分、西文 220 词/分估算，最少 1 分钟） */
  readingTime: number;
}

export interface Post extends PostMeta {
  /** 构建时预编译的 HTML（含 MdxComponents 变换），详情页直接渲染 */
  html: string;
  /** 文章标题结构（h2/h3），用于生成目录 */
  headings: { id: string; text: string; level: number }[];
}

const MONTH_DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

// 直接拆 ISO 字符串（YYYY-MM-DD），不走 Date 解析：
// new Date("2026-07-23") 是 UTC 零点，在西半球时区会被读成前一天。
function splitISO(date: string): [number, number, number] | null {
  const parts = date.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isInteger(n) || n <= 0)) return null;
  return [parts[0], parts[1], parts[2]];
}

// 归档页按年份分组，组内不再需要年份 → 只输出英文「Jul 23」
// 用 Intl 格式化、时区固定 UTC：与原来拆 ISO 字符串的意图一致，
// 不走本地时区，避免西半球时区把日期读成前一天。
export function formatMonthDay(date: string): string {
  const p = splitISO(date);
  if (!p) return date;
  return MONTH_DAY_FORMAT.format(new Date(Date.UTC(p[0], p[1] - 1, p[2])));
}
