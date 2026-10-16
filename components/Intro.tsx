import Link from "next/link";
import { siteConfig } from "../lib/site";

// 首页：自我介绍。顶部对齐的常规页面排版；
// 正文列居中、块内文字左对齐（样式见 styles/home.css 的 .intro）。
export default function Intro() {
  return (
    <section className="intro">
      <div className="intro__inner">
        <p className="intro__hi">
          Hi, I’m Gc <span className="intro__wave">👋</span>
        </p>
        <p className="intro__tagline">
          I am a practical open sourcerer. Still learning AI, and figuring out how to put it
          to work in daily life.
        </p>
        <p className="intro__text">
          I enjoy coming up with original ideas and finding ways to bring them to life. You
          can find some of my work{" "}
          <Link className="intro__link" href="/projects">
            here
          </Link>{" "}
          or on{" "}
          <a
            className="intro__link"
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p className="intro__text">
          Apart from programming, I also love games, sports, movies, and music. I enjoy
          sharing my life, and figuring out how to live in a way that feels true to myself.
        </p>
        <p className="intro__text">
          I read a lot too, mostly literary fiction — Hesse, Mo Yan, books that leave more
          questions than answers. I don’t read for takeaways. I read because a good one
          quietly rearranges how I see things, and it’s still the clearest mirror I’ve found
          for thinking about my own life.
        </p>
      </div>
    </section>
  );
}
