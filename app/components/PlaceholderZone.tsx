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
  image?: string;
  label?: string;
};

export function PlaceholderZone({ variant, image, label }: PlaceholderZoneProps) {
  return (
    <section
      className={`content-zone content-zone--${variant}`}
      aria-label="Future content area"
    >
      <div className="content-zone-header">
        <span className="content-zone-label">{label || labels[variant]}</span>
        <span className="content-zone-arrow">↗</span>
      </div>
      {image && (
        <div className="content-zone-cover">
          <img src={image} alt="" />
        </div>
      )}
    </section>
  );
}
