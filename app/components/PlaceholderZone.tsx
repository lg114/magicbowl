export type PlaceholderZoneVariant =
  | "side"
  | "wide-left"
  | "wide-right"
  | "tall-left"
  | "tall-right"
  | "full";

const labels: Record<PlaceholderZoneVariant, string> = {
  side: "Projects",
  "wide-left": "Blog",
  "wide-right": "Books",
  "tall-left": "Experiments",
  "tall-right": "Notes",
  full: "More",
};

type PlaceholderZoneProps = {
  variant: PlaceholderZoneVariant;
};

export function PlaceholderZone({ variant }: PlaceholderZoneProps) {
  return (
    <section
      className={`content-zone content-zone--${variant}`}
      aria-label="Future content area"
    >
      <div className="content-zone-header">
        <span className="content-zone-label">{labels[variant]}</span>
        <span className="content-zone-arrow">↗</span>
      </div>
    </section>
  );
}
