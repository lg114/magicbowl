"use client";

import { useLang } from "./LanguageContext";

type PageTitleProps = {
  title: string;
  titleCn: string;
  sub: string;
  subCn: string;
};

export function PageTitle({ title, titleCn, sub, subCn }: PageTitleProps) {
  const { lang } = useLang();

  return (
    <section className="page-title">
      <h1 className="page-title-text">
        {lang === "zh" ? titleCn : title}
      </h1>
      <p className="page-title-sub">
        {lang === "zh" ? subCn : sub}
      </p>
    </section>
  );
}
