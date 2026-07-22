export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const headingCounts = new Map<string, number>();

export function resetSlugCounts() {
  headingCounts.clear();
}

export function slugifyHeading(text: string): string {
  const base =
    text
      .trim()
      .toLowerCase()
      .replace(/[`*_~[\]()]/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";

  const count = headingCounts.get(base) ?? 0;
  headingCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function cleanHeadingText(text: string): string {
  return text
    .replace(/#+\s*$/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

export function extractTocHeadings(markdown: string): TocHeading[] {
  resetSlugCounts();

  const headings: TocHeading[] = [];
  let insideFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const text = cleanHeadingText(match[2]);
    if (!text) continue;

    headings.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  resetSlugCounts();
  return headings;
}
