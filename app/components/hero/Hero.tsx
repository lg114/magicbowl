import type { CSSProperties } from "react";

const IDENTITIES = [
  { num: "01", en: "designer" },
  { num: "02", en: "reader" },
  { num: "03", en: "developer" },
  { num: "04", en: "learner" },
];

export function Hero() {
  return (
    <section className="hero" aria-label="Identity">
      <p className="hero-eyebrow">
        IDENTITY <span className="hero-eyebrow-sep">/</span> 四种身份
      </p>
      <ul className="hero-lines">
        {IDENTITIES.map((it, i) => (
          <li
            key={it.num}
            className={
              it.en === "developer" ? "hero-line is-active" : "hero-line"
            }
            style={{ "--i": i } as CSSProperties}
          >
            <span className="hero-num">{it.num}</span>
            <span className="hero-iam">I am</span>
            <span className="hero-word">
              {it.en}
              {it.en === "learner" && <span className="hero-cursor">|</span>}
            </span>
          </li>
        ))}
      </ul>
      <p className="hero-desc">
        我是设计师，也是读者；写代码，也一直在学。这四句话，是我打开自己的方式。
      </p>
    </section>
  );
}
