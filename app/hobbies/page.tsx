import { type Hobby } from "../components/HobbyCard";
import { HobbyList } from "../components/HobbyList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";

const hobbies: Hobby[] = [
  {
    title: "Gym",
    titleCn: "健身",
    description:
      "Training for less than a year. I love back workouts — a healthy body brings a better life.",
    descriptionCn:
      "健身不到一年，喜欢做背部训练，健康的身体给我带来更美好的生活。",
  },
  {
    title: "Snooker",
    titleCn: "斯诺克",
    description:
      "I enjoy the feeling when the ball drops into the pocket — it's incredibly satisfying.",
    descriptionCn:
      "我享受球进袋时的感觉，这让我十分满足。",
  },
  {
    title: "Reading",
    titleCn: "阅读",
    description:
      "Mostly philosophy, history, and self-improvement. Books help me think more clearly about life.",
    descriptionCn:
      "主要读哲学、历史和自我提升类书籍。阅读帮我更清晰地思考生活。",
  },
];

export async function generateMetadata() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "zh" ? "zh" : "en";
  return {
    title: lang === "zh" ? "爱好 — magicbowl" : "Hobbies — magicbowl",
    description: lang === "zh" ? "Gc 空闲时喜欢做的事。" : "What Gc enjoys off the screen.",
  };
}

export default function HobbiesPage() {
  return (
    <main className="page-shell">
      <div className="canvas">
        <Header activeItem="Hobbies" />

        <PageTitle
          title="Hobbies"
          titleCn="爱好"
          sub="What I enjoy off the screen."
          subCn="空闲时，我喜欢做的事。"
        />

        <HobbyList hobbies={hobbies} />

        <Footer />
      </div>
    </main>
  );
}
