// 首页仅渲染背景（纯 CSS 网格 + 呼吸动效，见 globals.css 的 body::before）。
// 主题切换按钮由 layout 中的 ThemeToggle 提供。此处不渲染任何内容卡片。
export default function Home() {
  return <main aria-hidden="true" />;
}
