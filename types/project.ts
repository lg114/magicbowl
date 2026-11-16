export interface Project {
  name: string;
  desc: string;
  repo?: string;
  /** 有案例页时用来关联 lib/case-studies.ts 的 key。卡片本身仍外链仓库，不跳案例页。 */
  slug?: string;
}
