export type DemoImage = {
  src: string;
  alt: string;
};

type DemoCardProps = {
  name: string;
  desc: string;
  href?: string;
  image?: DemoImage;
};

export default function DemoCard({ name, desc, href, image }: DemoCardProps) {
  const className = `demo-item${image ? " demo-item--media" : ""}`;
  const body = (
    <>
      {image ? (
        <span className="demo-item__media">
          <img src={image.src} alt={image.alt} width={860} height={516} />
        </span>
      ) : null}
      <h2 className="demo-item__name">{name}</h2>
      <p className="demo-item__desc">{desc}</p>
    </>
  );

  if (!href) {
    return <div className={className}>{body}</div>;
  }

  return (
    <a className={className} href={href}>
      {body}
    </a>
  );
}
