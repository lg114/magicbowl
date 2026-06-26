import type { Book } from "../types/book";
import type { Hobby } from "../types/hobby";
import type { BlogPostMeta } from "./posts";

export type PlaceholderZoneConfig = {
  variant: "side" | "wide-left" | "wide-right";
  image?: string;
  label?: string;
  labelCn?: string;
  sub?: string;
  subCn?: string;
  link?: string;
  tooltip?: string;
  tooltipCn?: string;
};

export const zones: PlaceholderZoneConfig[] = [
  {
    variant: "side",
    image: "/projects/ragmate.png",
    label: "Project",
    labelCn: "项目",
    sub: "RagMate",
    subCn: "RagMate",
    link: "https://github.com/lg114/RagMate",
    tooltip: "View on GitHub",
    tooltipCn: "去 GitHub 看看",
  },
];

export type BentoItem =
  | { type: "book"; data: Book }
  | { type: "hobby"; data: Hobby }
  | { type: "blog"; data: BlogPostMeta };

export function buildBentoItems(
  books: Book[],
  hobbies: Hobby[],
  posts: BlogPostMeta[]
): BentoItem[] {
  return [
    ...books.slice(0, 2).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(0, 1).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(0, 1).map((p) => ({ type: "blog" as const, data: p })),
    ...books.slice(2, 3).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(1, 2).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(1, 2).map((p) => ({ type: "blog" as const, data: p })),
    ...books.slice(3).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(2).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(2).map((p) => ({ type: "blog" as const, data: p })),
  ];
}

export function getBentoItemSize(index: number): "narrow" | "wide" {
  return index < 4 ? "narrow" : "wide";
}
