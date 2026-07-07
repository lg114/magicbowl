import "./styles/home.css";
import Hero from "./components/Hero";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  return (
    <SplashScreen>
      <Hero />
    </SplashScreen>
  );
}
