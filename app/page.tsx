import Hero from "../components/Hero";
import ScrollCue from "../components/ScrollCue";
import RecentPosts from "../components/RecentPosts";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <main>
        <section className="screen">
          <Hero />
          <ScrollCue />
        </section>
        <RecentPosts />
        <FeaturedProjects />
      </main>
    </>
  );
}
