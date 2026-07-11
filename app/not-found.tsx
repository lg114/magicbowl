import Link from "next/link";

// 全局 404：访问不存在的路由（如拼错的文章链接）时由 Next 渲染。
// 沿用全局萤火虫背景，居中展示中文提示 + 返回首页入口。
export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">页面走丢了</h1>
        <p className="notfound__desc">你访问的页面不存在，或许已被移动或删除。</p>
        <Link href="/" className="notfound__link">
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
