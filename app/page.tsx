import Hero from "../components/Hero";
import RecentPosts from "../components/RecentPosts";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <main>
        <section className="screen">
          <Hero />
        </section>
        <RecentPosts />
        <FeaturedProjects />
      </main>
    </>
  );
}
