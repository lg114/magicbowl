"use client";

import Image from "next/image";
import { useLang } from "./LanguageContext";

export type Hobby = {
  title: string;
  titleCn?: string;
  description: string;
  descriptionCn?: string;
  image?: string;
};

type HobbyCardProps = {
  hobby: Hobby;
};

export function HobbyCard({ hobby }: HobbyCardProps) {
  const { lang } = useLang();
  const title = lang === "zh" && hobby.titleCn ? hobby.titleCn : hobby.title;
  const description =
    lang === "zh" && hobby.descriptionCn ? hobby.descriptionCn : hobby.description;

  return (
    <article className="hobby-card">
      <div className="hobby-card-header">
        <span className="hobby-card-label">
          {lang === "zh" ? "爱好" : "Hobby"}
        </span>
      </div>

      {hobby.image && (
        <div className="hobby-card-cover">
          <Image src={hobby.image} alt={`${title}`} width={800} height={600} sizes="(max-width: 767px) 100vw, 50vw" className="hobby-card-cover-img" />
        </div>
      )}

      <div className="hobby-card-info">
        <h3 className="hobby-card-title">{title}</h3>
        <p className="hobby-card-description">{description}</p>
      </div>
    </article>
  );
}
