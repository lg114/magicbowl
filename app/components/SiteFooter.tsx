import Link from "next/link";
import { siteConfig } from "../../lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__name">{siteConfig.name}</span>
          <p className="site-footer__tagline">{siteConfig.description}</p>
        </div>
        <nav className="site-footer__links" aria-label="页脚导航">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-footer__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-footer__social">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a href={siteConfig.social.email}>邮箱</a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noreferrer noopener"
          >
            Twitter
          </a>
        </div>
      </div>
      <p className="site-footer__copy">
        © {year} {siteConfig.author}. 用 Next.js 构建。
      </p>
    </footer>
  );
}
