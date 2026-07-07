import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "MagicBowl",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
