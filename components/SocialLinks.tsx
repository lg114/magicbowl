import { siteConfig } from "../lib/site";

// 页脚社交图标：GitHub / X 已移到右上角导航栏（见 NavBar），这里只保留 Email。
export default function SocialLinks() {
  return (
    <nav className="footer__social" aria-label="Contact">
      <a className="footer__link" href={siteConfig.social.email} aria-label="Email">
        <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm.83 2L12 11.2 20.17 7H3.83zM20 9.06V18H4V9.06l8 4.43 8-4.43z" />
        </svg>
      </a>
    </nav>
  );
}
