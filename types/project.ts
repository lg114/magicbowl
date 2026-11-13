export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  name: string;
  desc: string;
  tech: string[];
  status: "active" | "working on" | "archived";
  repo?: string;
  demo?: string;
  featured?: boolean;
  /** 有案例页时的 slug。卡片链接到 /projects/[slug]，而不是外链仓库。 */
  slug?: string;
  /** 仓库里已有的真实截图。没有就不渲染图片。 */
  image?: ProjectImage;
}
