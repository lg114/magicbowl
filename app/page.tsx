// 首页渲染背景（纯 CSS 网格 + 呼吸动效，见 globals.css 的 body::before）
// + 居中头像（从上往下淡入落下、持续弹跳，见 .avatar）
// + 头像下方的欢迎语（见 .welcome）
// + 箴言区 Wisdom（见 app/components/Wisdom.tsx，每次刷新随机展示一条 + 滚动提示箭头）。
// 主题切换按钮由 layout 中的 ThemeToggle 提供。
import Wisdom from "./components/Wisdom";

export default function Home() {
  return (
    <>
      {/* 全屏萤火虫夜空层：移到 main 之外作 body 级背景，
          这样 main 内所有内容（头像/欢迎语/箴言）自动位于萤火虫之上，
          不必给每个区块单独提 z-index */}
      <div className="firefly-field" aria-hidden="true">
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
        <span className="spark" />
      </div>
      <main>
        <div className="hero">
          {/* 头像舞台：相对定位，承载「落下入场 + 弹跳」的头像 */}
          <div className="avatar-stage">
            {/* 外层做一次性落下入场，内层 img 做无限弹跳，各管各的 transform 避免冲突 */}
            <div className="avatar-drop">
              <img className="avatar" src="/avatar.png" alt="MagicBowl" />
            </div>
          </div>
          <div className="welcome">
            <p className="welcome__hi">
              Hey there, I&apos;m <span className="welcome__name">Gc</span>{" "}
              <span className="welcome__wave">👋</span>
            </p>
            <p className="welcome__sub">Welcome to my magic bowl</p>
            <p className="welcome__roles">
              I am a{" "}
              <span className="role-word">learner</span>
              {" · "}
              <span className="role-word">designer</span>
              {" · "}
              <span className="role-word">reader</span>
              {" · "}
              <span className="role-word">developer</span>
            </p>
          </div>
        </div>
        <Wisdom />
      </main>
    </>
  );
}
