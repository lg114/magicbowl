import Image from "next/image";
import { siteConfig } from "../lib/site";

export default function Hero() {
  return (
    <div className="hero">
      <div className="avatar-stage">
        <div className="avatar-drop">
          <Image
            src={siteConfig.avatar}
            alt="Gc 的头像"
            width={200}
            height={200}
            className="avatar"
            priority
            decoding="async"
            sizes="(max-width: 480px) 130px, (max-width: 680px) 160px, 200px"
          />
        </div>
      </div>
      <div className="welcome">
        <p className="welcome__hi">
          你好，我是 <span className="welcome__name">Gc</span>{" "}
          <span className="welcome__wave">👋</span>
        </p>
        <p className="welcome__tagline">
          我想把 <span className="welcome__hl">AI</span> 融入生活。
        </p>
      </div>
    </div>
  );
}
