import Hero from "../components/Hero";
import Wisdom from "../components/Wisdom";
import DrawerShelf from "../components/DrawerShelf";
import RecentPosts from "../components/RecentPosts";
import FeaturedProjects from "../components/FeaturedProjects";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  // 文件抽屉只取最近 8 篇做成文件夹（组件为 client，数据在 server 侧注入）
  const drawerPosts = getAllPosts().slice(0, 8);
  return (
    <>
      <main>
        <section className="screen">
          <Hero />
          <Wisdom />
        </section>
        <DrawerShelf posts={drawerPosts} />
        <RecentPosts />
        <FeaturedProjects />
      </main>
    </>
  );
}
