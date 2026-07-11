"use client";

import { useState } from "react";
import type { PostMeta } from "../../lib/post-types";
import PostCard from "./PostCard";

// 归档页分页：客户端按页切片，按钮翻页、无滚动注入、无位移动效，
// 契合「眩晕安全区」偏好。整份文章列表一次性传入，翻页仅切换可见切片。
const PER_PAGE = 12;

export default function PostsArchive({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const visible = posts.slice(start, start + PER_PAGE);

  return (
    <>
      <div className="cards__grid">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="文章分页">
          <button
            type="button"
            className="page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← 上一页
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`page-btn${n === page ? " page-btn--active" : ""}`}
              onClick={() => setPage(n)}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            下一页 →
          </button>
        </nav>
      )}
    </>
  );
}
