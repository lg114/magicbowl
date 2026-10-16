// 首页：自我介绍。顶部对齐的常规页面排版（小字），
// 与归档页 / 项目页同构（居中容器 + 左对齐内容）。
export default function Intro() {
  return (
    <section className="intro">
      <div className="intro__inner">
        <p className="intro__hi">
          Hi, I’m <span className="intro__name">Gc</span>{" "}
          <span className="intro__wave">👋</span>
        </p>
        <p className="intro__tagline">
          I want to bring <span className="intro__hl">AI</span> into everyday life.
        </p>
      </div>
    </section>
  );
}
