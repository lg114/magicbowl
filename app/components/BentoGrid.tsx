import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";

const zones: { variant: PlaceholderZoneVariant; image?: string; label?: string }[] = [
  { variant: "side", image: "/projects/ragmate.png", label: "Project · RagMate" },
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
        />
      ))}
    </div>
  );
}
