import "./styles/home.css";
import Hero from "./components/Hero";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  return (
    <SplashScreen>
      <Hero />

      <section id="main-content" className="main-content">
        <h2>主内容区</h2>
        <p>待接入内容 · 这里将随着 MagicBowl 一起生长</p>
      </section>
    </SplashScreen>
  );
}
