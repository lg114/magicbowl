"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Lang = "en" | "zh";

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31536000;SameSite=Lax`;
}

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "en", toggle: () => {} });

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const match = document.cookie.match(/(?:^| )lang=([^;]+)/);
    const saved = match ? decodeURIComponent(match[1]) : null;
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);

  const toggle = () =>
    setLang((prev) => {
      const next = prev === "en" ? "zh" : "en";
      setCookie("lang", next);
      document.documentElement.lang = next;
      return next;
    });

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
