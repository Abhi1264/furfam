import type React from "react";
import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SearchProviderWithContext } from "@/components/search-provider";
import { SiteJsonLd } from "@/components/site-json-ld";
import { buildSearchResults } from "@/lib/search-results";
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
    "pan India dogs",
    "pet shop India",
    "pet shop online India",
    "pet shop near me India",
    "pet supplies India",
    "pet adoption India",
    "pet care pan India",
    "dog adoption pan India",
    "dog shop all India",
    "dog delivery India",
    "dog puppies all cities India",
    "best pet shop India",
    "pet store India",
    "pet store near me India",
    // Major metro cities
    "pet shop in Mumbai",
    "pet shop in Delhi",
    "pet shop in Bangalore",
    "pet shop in Hyderabad",
    "pet shop in Chennai",
    "pet shop in Kolkata",
    "pet shop in Pune",
    "pet shop in Ahmedabad",
    // Tier-1 & 2 cities
    "pet shop in Noida",
    "pet shop in Gurugram",
    "pet shop in Gurgaon",
    "pet shop in Surat",
    "pet shop in Jaipur",
    "pet shop in Lucknow",
    "pet shop in Kanpur",
    "pet shop in Indore",
    "pet shop in Bhopal",
    "pet shop in Patna",
    "pet shop in Nagpur",
    "pet shop in Nashik",
    "pet shop in Thane",
    "pet shop in Pimpri-Chinchwad",
    "pet shop in Vadodara",
    "pet shop in Ludhiana",
    "pet shop in Agra",
    "pet shop in Varanasi",
    "pet shop in Allahabad",
    "pet shop in Coimbatore",
    "pet shop in Kochi",
    "pet shop in Bhubaneswar",
    "pet shop in Chandigarh",
    "pet shop in Ranchi",
    "pet shop in Raipur",
    "pet shop in Guwahati",
    "pet shop in Visakhapatnam",
    "pet shop in Vijayawada",
    "pet shop in Warangal",
    "pet shop in Mysore",
    "pet shop in Mangalore",
    "pet shop in Amritsar",
    "pet shop in Jalandhar",
    "pet shop in Dehradun",
    "pet shop in Shimla",
    "pet shop in Jammu",
    "pet shop in Srinagar",
    "pet shop in Siliguri",
    "pet shop in Dhanbad",
    "pet shop in Jamshedpur",
    "pet shop in Asansol",
    "pet shop in Aurangabad",
    "pet shop in Solapur",
    "pet shop in Meerut",
    "pet shop in Faridabad",
    "pet shop in Ghaziabad",
    "pet shop in Gwalior",
    "pet shop in Kota",
    "pet shop in Howrah",
    "pet shop in Hubli",
    "pet shop in Belgaum",
    "pet shop in Madurai",
    "pet shop in Salem",
    "pet shop in Tiruchirappalli",
    "pet shop in Tirunelveli",
    // State keywords
    "pet shop in Maharashtra",
    "pet shop in Karnataka",
    "pet shop in Tamil Nadu",
    "pet shop in West Bengal",
    "pet shop in Uttar Pradesh",
    "pet shop in Madhya Pradesh",
    "pet shop in Rajasthan",
    "pet shop in Haryana",
    "pet shop in Jharkhand",
    "pet shop in Chhattisgarh",
    "pet shop in Odisha",
    "pet shop in Orissa",
    "pet shop in Andhra Pradesh",
    "pet shop in Telangana",
    "pet shop in Punjab",
    "pet shop in Kerala",
    "pet shop in Bihar",
    "pet shop in Uttarakhand",
    "pet shop in Himachal Pradesh",
    "pet shop in Assam",
    // Misc
    "pet shop delivery India",
    "trusted pet shop India",
    "dog shop near me India",
    "online pet store India",
    "dog breeder India",
    "responsible breeder India",
    "family friendly dogs India",
    "puppy shop India",
    "puppy near me India",
    "puppy for sale India",
    "dog adoption citywise India",
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
  const searchData = buildSearchResults();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${nunito.className} ${fredoka.className} antialiased`}>
        <SiteJsonLd />
        <SearchProviderWithContext searchData={searchData}>
          {children}
        </SearchProviderWithContext>
        <Analytics />
      </body>
    </html>
  );
}
