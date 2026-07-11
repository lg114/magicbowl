// 首页渲染背景（纯 CSS 网格 + 呼吸动效，见 globals.css 的 body::before）
// + 居中头像（从上往下淡入落下、持续弹跳，见 .avatar）
// + 头像下方的欢迎语（见 .welcome）。
// 主题切换按钮由 layout 中的 ThemeToggle 提供。
export default function Home() {
  return (
    <main>
      {/* 全屏萤火虫夜空层：蓝色萤火虫稀疏散布、缓慢明灭游动（装饰、不挡交互） */}
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
            I am a learner · designer · reader · developer
          </p>
        </div>
      </div>
    </main>
  );
}
