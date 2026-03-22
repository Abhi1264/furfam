import type React from "react";
import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SearchProviderWithContext } from "@/components/search-provider";
import { SiteJsonLd } from "@/components/site-json-ld";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

const siteUrl = getSiteUrl();
const defaultTitle =
  "FurFam Pet Shop | Premium Dog Breeds & Pet Care Across India";
const defaultDescription =
  "Discover trusted dog breed guides, responsible pet care advice, and ethical breeding guidance for families across India. FurFam supports pet parents pan-India.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | FurFam",
  },
  description: defaultDescription,
  keywords: [
    "dog breeds India",
    "puppies India",
    "pet dog India",
    "dog care India",
    "ethical dog breeding India",
    "FurFam",
    "pan India pets",
    "pet shop India",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FurFam",
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: "/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "FurFam — dog breeds and pet care in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/home-hero.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${nunito.className} ${fredoka.className} antialiased`}>
        <SiteJsonLd />
        <SearchProviderWithContext>{children}</SearchProviderWithContext>
        <Analytics />
      </body>
    </html>
  );
}
