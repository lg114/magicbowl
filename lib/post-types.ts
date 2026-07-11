// 纯类型与无副作用工具，独立成模块避免把 fs 等 Node API 打进浏览器包。
// 客户端组件（PostCard / PostsArchive）只从这里取类型与 formatDate。

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
