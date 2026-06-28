"use client";

import { memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import type { Hobby } from "../../types/hobby";

type HobbyCardProps = {
  hobby: Hobby;
};

export const HobbyCard = memo(function HobbyCard({ hobby }: HobbyCardProps) {
  const { lang } = useLang();
  const title = lang === "zh" && hobby.titleCn ? hobby.titleCn : hobby.title;
  const description =
    lang === "zh" && hobby.descriptionCn ? hobby.descriptionCn : hobby.description;
  const coverImage = hobby.images && hobby.images.length > 0 ? hobby.images[0] : hobby.image;

  return (
    <article className="hobby-bento-card">
      {coverImage && (
        <Image src={coverImage} alt={title} fill sizes="(max-width: 767px) 100vw, 50vw" className="hobby-bento-cover-img" />
      )}
      <div className="hobby-bento-overlay hobby-bento-overlay--bottom">
        <div className="hobby-bento-info">
          <h3 className="hobby-bento-title">{title}</h3>
          <p className="hobby-bento-desc">{description}</p>
        </div>
      </div>
    </article>
  );
});
