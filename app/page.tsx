import Hero from "./components/Hero";
import Wisdom from "./components/Wisdom";
import PostCards from "./components/PostCards";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <main>
        <section className="screen">
          <Hero />
          <Wisdom />
        </section>
        <PostCards />
        <FeaturedProjects />
      </main>
    </>
  );
}
