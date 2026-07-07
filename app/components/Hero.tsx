import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="home-title">MagicBowl</h1>
      <p className="home-sub">一个正在生长的地方</p>
      <div className="hero-cta">
        <Link href="/posts" className="hero-cta__primary">
          阅读文章
        </Link>
        <Link href="/about" className="hero-cta__ghost">
          关于我
        </Link>
      </div>
    </section>
  );
}
