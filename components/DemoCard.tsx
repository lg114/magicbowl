"use client";

import { useEffect, useRef, useState } from "react";

export type DemoMedia = {
  mp4: string;
  webm?: string;
  poster: string;
};

type DemoCardProps = {
  name: string;
  desc: string;
  href?: string;
  media?: DemoMedia;
};

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function DemoCard({ name, desc, href, media }: DemoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useRef(false);
  const [playing, setPlaying] = useState(false);

  function reset() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* metadata may not be loaded yet */
    }
    setPlaying(false);
  }

  function play() {
    const video = videoRef.current;
    if (!video || reduced.current) return;
    const pending = video.play();
    if (pending) {
      pending.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => {
      reduced.current = motion.matches;
      if (motion.matches) reset();
    };
    applyMotion();
    motion.addEventListener("change", applyMotion);

    const node = rootRef.current;
    let observer: IntersectionObserver | undefined;
    if (node && media && !canHover()) {
      observer = new IntersectionObserver(
        (entries) => {
          if (reduced.current) return;
          if (entries.some((entry) => entry.isIntersecting)) play();
          else reset();
        },
        { threshold: 0.6 },
      );
      observer.observe(node);
    }

    return () => {
      motion.removeEventListener("change", applyMotion);
      observer?.disconnect();
    };
  }, [media]);

  const body = (
    <>
      {media ? (
        <span className={`demo-item__media${playing ? " is-playing" : ""}`}>
          <img src={media.poster} alt="" />
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            poster={media.poster}
            aria-hidden="true"
          >
            {media.webm ? <source src={media.webm} type="video/webm" /> : null}
            <source src={media.mp4} type="video/mp4" />
          </video>
        </span>
      ) : null}
      <h2 className="demo-item__name">{name}</h2>
      <p className="demo-item__desc">{desc}</p>
    </>
  );

  const className = `demo-item${media ? " demo-item--media" : ""}`;
  const hoverProps = {
    onMouseEnter: () => {
      if (canHover()) play();
    },
    onMouseLeave: () => {
      if (canHover()) reset();
    },
    onFocus: () => play(),
    onBlur: () => reset(),
  };

  if (!href) {
    return (
      <div ref={rootRef as React.Ref<HTMLDivElement>} className={className}>
        {body}
      </div>
    );
  }

  return (
    <a
      ref={rootRef as React.Ref<HTMLAnchorElement>}
      className={className}
      href={href}
      {...hoverProps}
    >
      {body}
    </a>
  );
}
