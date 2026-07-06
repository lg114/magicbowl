import { Hero } from "../components/hero/Hero";

export const metadata = {
  title: "Hero 预览 · 野径",
};

export default function HeroPreview() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#16150f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <Hero />
    </main>
  );
}
