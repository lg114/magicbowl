"use client";

import { useState } from "react";

export default function AvatarCard() {
  const [bubbleOn, setBubbleOn] = useState(false);

  return (
    <div
      className="home-card home-card--avatar"
      onClick={() => setBubbleOn((v) => !v)}
    >
      <div className="avatar-stage">
        <span className="avatar-sparkle avatar-sparkle--1" />
        <span className="avatar-sparkle avatar-sparkle--2" />
        <span className="avatar-sparkle avatar-sparkle--3" />
        <span className="avatar-sparkle avatar-sparkle--4" />
        <div className="avatar-float">
          <img src="/avatar.png" alt="avatar" className="avatar-img" />
        </div>
        <span className="avatar-shadow" />
        <span
          className={`avatar-bubble${bubbleOn ? " avatar-bubble--on" : ""}`}
          role="tooltip"
        >
          Hi, I&apos;m gc 👋
        </span>
      </div>
    </div>
  );
}
