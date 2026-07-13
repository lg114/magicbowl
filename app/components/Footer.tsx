// 全局页脚：精简版（© 年份 + 站名 + 社交图标），无返回顶部、无快捷导航。
// 服务端组件，年份在构建时确定（个人站足够，避免客户端水合差异）。
// 社交图标复用 hero 的 GitHub / X 规范，并补一个邮件图标；均取自 siteConfig.social。
import { siteConfig } from "../../lib/site";

const ICONS = {
  github: (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  ),
  x: (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm.83 2L12 11.2 20.17 7H3.83zM20 9.06V18H4V9.06l8 4.43 8-4.43z" />
    </svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          © {year} {siteConfig.name}
        </p>
        <nav className="footer__social" aria-label="社交链接">
          <a
            className="footer__link"
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            {ICONS.github}
          </a>
          <a
            className="footer__link"
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            {ICONS.x}
          </a>
          <a
            className="footer__link"
            href={siteConfig.social.email}
            aria-label="Email"
          >
            {ICONS.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
