"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";

export function IntroCard() {
  const { lang } = useLang();

  if (lang === "zh") {
    return (
      <section className="intro-card" aria-label="Introduction">
        <p>
          你好，我是 <strong className="intro-keyword">Gc</strong> 👋
        </p>

        <p>
          欢迎来到我的{" "}
          <Link href="/blogs/magicbowl-philosophy" className="intro-link intro-link--gold">
            <strong className="intro-keyword">magic bowl</strong>
          </Link>{" "}
          🔮！
        </p>

        <p>
          我喜欢捣鼓东西，最近对{" "}
          <span className="intro-link intro-link--blue">
            <strong className="intro-keyword">AI</strong> 和{" "}
            <strong className="intro-keyword">LLMs</strong>
          </span>
          特别着迷。
        </p>

        <p>
          不忙的时候，我喜欢去
          <span className="intro-link intro-link--green">
            <strong className="intro-keyword">健身房</strong>
          </span>
          锻炼 💪🏻 和打{" "}
          <span className="intro-link intro-link--rose">
            <strong className="intro-keyword">斯诺克</strong>
          </span>{" "}
          🎱。
        </p>

        <p>
          除此之外，我有空的时候会阅读些有关{" "}
          <span className="intro-link intro-link--amber">
            <strong className="intro-keyword">哲学</strong>
          </span>
          、{" "}
          <span className="intro-link intro-link--teal">
            <strong className="intro-keyword">历史</strong>
          </span>
          和{" "}
          <span className="intro-link intro-link--purple">
            <strong className="intro-keyword">自我提升</strong>
          </span>{" "}
          的书籍📚。
        </p>
      </section>
    );
  }

  return (
    <section className="intro-card" aria-label="Introduction">
      <p>
        Hey there, I&apos;m <strong className="intro-keyword">Gc</strong> 👋
      </p>

      <p>
        Welcome to my{" "}
        <Link href="/blogs/magicbowl-philosophy" className="intro-link intro-link--gold">
          <strong className="intro-keyword">magic bowl</strong>
        </Link>{" "}
        🔮!
      </p>

      <p>
        I love building things, and lately, I&apos;ve been getting really into{" "}
        <span className="intro-link intro-link--blue">
          <strong className="intro-keyword">AI</strong> &amp;{" "}
          <strong className="intro-keyword">LLMs</strong>
        </span>
        .
      </p>

      <p>
        Off the screen, I stay active by hitting the{" "}
        <span className="intro-link intro-link--green">
          <strong className="intro-keyword">gym</strong>
        </span>{" "}
        💪🏻 and playing{" "}
        <span className="intro-link intro-link--rose">
          <strong className="intro-keyword">snooker</strong>
        </span>{" "}
        🎱.
      </p>

      <p>
        Besides that, I spend my downtime reading up on{" "}
        <span className="intro-link intro-link--amber">
          <strong className="intro-keyword">philosophy</strong>
        </span>
        ,{" "}
        <span className="intro-link intro-link--teal">
          <strong className="intro-keyword">history</strong>
        </span>
        , and{" "}
        <span className="intro-link intro-link--purple">
          <strong className="intro-keyword">self-improvement</strong>
        </span>{" "}
        📚.
      </p>
    </section>
  );
}
