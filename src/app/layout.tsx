import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Cursor } from "@/components/fx/Cursor";
import { CursorProvider } from "@/components/fx/CursorProvider";
import { Preloader } from "@/components/fx/Preloader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${instrumentSerif.variable} cursor-none antialiased`}
      >
        <CursorProvider>
          <Preloader />
          <SmoothScroll />
          <Cursor />
          <div className="grain" aria-hidden />
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </CursorProvider>
      </body>
    </html>
  );
}
