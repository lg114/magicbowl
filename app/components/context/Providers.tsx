"use client";

import { LanguageProvider } from "./LanguageContext";
import type { ReactNode } from "react";

type Lang = "en" | "zh";

export function Providers({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      {children}
    </LanguageProvider>
  );
}
