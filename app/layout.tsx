import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "magicbowl",
  description: "Gc's personal homepage and digital garden.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang =
    cookieStore.get("lang")?.value === "zh" ? "zh" : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
