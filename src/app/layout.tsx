import type React from "react";
import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://furfam.vercel.app",
  ),
  title: "FurFam Pet Shop | Premium Dog Breeds & Pet Care",
  description:
    "Discover your perfect furry companion at FurFam. We offer premium dog breeds, expert pet care advice, and quality pet products. Find your new family member today!",
  keywords:
    "pet shop, dog breeds, puppies for sale, pet care, dog adoption, pet store, premium dogs",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
