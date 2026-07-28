import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { resetSlugCounts, slugifyHeading } from "../lib/mdx";

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    const props = children.props as { children?: ReactNode };
    return textFromChildren(props.children);
  }
  return "";
}

function Heading({
  level,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { level: 2 | 3 }) {
  const id = slugifyHeading(textFromChildren(children));
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag id={id} {...props}>
      <a className="post__heading-anchor" href={`#${id}`} aria-label="复制本节链接">
        #
      </a>
      {children}
    </Tag>
  );
}

export function createMdxComponents() {
  resetSlugCounts();

  return {
    h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...props} />,
    h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...props} />,
    a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="post__quote" {...props}>
        {children}
      </blockquote>
    ),
    pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
      <pre className="post__codeblock" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code {...props}>{children}</code>
    ),
    img: ({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
      <figure className="post__figure">
        <img alt={alt} {...props} />
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    ),
  };
}
