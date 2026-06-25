"use client";

import { useEffect } from "react";
import { useLang } from "./LanguageContext";

export function DocumentTitle({
  title,
  titleCn,
}: {
  title: string;
  titleCn: string;
}) {
  const { lang } = useLang();

  useEffect(() => {
    document.title = lang === "zh" ? `${titleCn} — magicbowl` : `${title} — magicbowl`;
  }, [lang, title, titleCn]);

  return null;
}
