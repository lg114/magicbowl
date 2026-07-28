import { siteConfig } from "../lib/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          © {year} {siteConfig.name}
        </p>
        <SocialLinks variant="footer" includeEmail />
      </div>
    </footer>
  );
}
