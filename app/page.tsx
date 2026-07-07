import "./styles/home.css";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="main-content" className="main-content">
        <h2>主内容区</h2>
        <p>待接入内容 · 这里将随着 MagicBowl 一起生长</p>
      </section>
    </>
  );
}
