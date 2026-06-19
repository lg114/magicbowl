import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";

const zones: PlaceholderZoneVariant[] = [
  "side",
  "wide-left",
  "wide-right",
  "tall-left",
  "tall-right",
  "full",
];

export function BentoGrid() {
  return (
    <div className="bento-grid">
      <IntroCard />
      {zones.map((zone) => (
        <PlaceholderZone key={zone} variant={zone} />
      ))}
    </div>
  );
}
