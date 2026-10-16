import Hero from "../components/Hero";
import Wisdom from "../components/Wisdom";
import RecentPosts from "../components/RecentPosts";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <main>
        <section className="screen">
          <Hero />
          <Wisdom />
        </section>
        <RecentPosts />
        <FeaturedProjects />
      </main>
    </>
  );
}
