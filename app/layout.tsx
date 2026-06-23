import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/Providers";
import RouteChangeAnimator from "./components/RouteChangeAnimator";

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-montserrat",
});

const merriweather = localFont({
  src: [
    { path: "../fonts/merriweather-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/merriweather-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-merriweather",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://magicbowl.vercel.app"),
  title: {
    default: "magicbowl",
    template: "%s — magicbowl",
  },
  description: "Gc's personal homepage and digital garden.",
  openGraph: {
    siteName: "magicbowl",
    type: "website",
    title: "magicbowl",
    description: "Gc's personal homepage and digital garden.",
  },
  twitter: {
    card: "summary_large_image",
    title: "magicbowl",
    description: "Gc's personal homepage and digital garden.",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
    <html lang={lang} className={`${montserrat.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body>
        <Providers initialLang={lang}>
          <RouteChangeAnimator>{children}</RouteChangeAnimator>
        </Providers>
      </body>
    </html>
  );
}
