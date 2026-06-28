import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/context/Providers";
import RouteChangeAnimator from "./components/context/RouteChangeAnimator";

const smileySans = localFont({
  src: [{ path: "../fonts/SmileySans-Oblique.otf.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-smiley",
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
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
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
    <html lang={lang} className={smileySans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Providers initialLang={lang}>
          <RouteChangeAnimator>{children}</RouteChangeAnimator>
        </Providers>
      </body>
    </html>
  );
}
