import { siteConfig } from "../lib/site";

// 页脚：内容许可 + 版权。社交链接（GitHub / X）在右上角导航栏；邮箱图标已移除。
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          <a
            className="footer__license"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>{" "}
          2025–Present ©{siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
