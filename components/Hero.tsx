// 首屏：居中的自我介绍。头像已移除，纯文字承担主视觉。
export default function Hero() {
  return (
    <div className="hero">
      <div className="welcome">
        <p className="welcome__hi">
          Hi, I’m <span className="welcome__name">Gc</span>{" "}
          <span className="welcome__wave">👋</span>
        </p>
        <p className="welcome__tagline">
          I want to bring <span className="welcome__hl">AI</span> into everyday life.
        </p>
      </div>
    </div>
  );
}
