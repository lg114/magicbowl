"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "首页" },
  { href: "/posts", label: "文章" },
];

// 左上角固定导航条：玻璃胶囊风格，与右上角 ThemeToggle 视觉统一；
// 按当前路由高亮（首页 /posts 及其详情页均视为 Posts 激活）。
export default function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="nav" aria-label="主导航">
      <div className="nav__links">
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={"nav__link" + (active ? " is-active" : "")}
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
