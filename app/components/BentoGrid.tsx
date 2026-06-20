"use client";

import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";

const zones: {
  variant: PlaceholderZoneVariant;
  image?: string;
  label?: string;
  labelCn?: string;
  sub?: string;
  subCn?: string;
  link?: string;
  tooltip?: string;
  tooltipCn?: string;
}[] = [
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
  { variant: "wide-left" },
  { variant: "wide-right" },
  { variant: "tall-left" },
  { variant: "tall-right" },
  { variant: "full" },
];

export function BentoGrid() {
  return (
    <div className="bento-grid">
      <IntroCard />
      {zones.map((zone) => (
        <PlaceholderZone
          key={zone.variant}
          variant={zone.variant}
          image={zone.image}
          label={zone.label}
          labelCn={zone.labelCn}
          sub={zone.sub}
          subCn={zone.subCn}
          link={zone.link}
          tooltip={zone.tooltip}
          tooltipCn={zone.tooltipCn}
        />
      ))}
    </div>
  );
}
