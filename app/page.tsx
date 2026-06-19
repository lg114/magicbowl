import { BentoGrid } from "./components/BentoGrid";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header />
        <BentoGrid />
        <Footer />
      </div>
    </main>
  );
}
