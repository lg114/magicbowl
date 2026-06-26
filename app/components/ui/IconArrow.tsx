export function IconArrow({
  tooltip,
  href,
  className = "content-zone-arrow",
}: {
  tooltip?: string;
  href?: string;
  className?: string;
}) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" data-source={tooltip}>
        {svg}
      </a>
    );
  }

  return (
    <span className={className} data-source={tooltip}>
      {svg}
    </span>
  );
}
