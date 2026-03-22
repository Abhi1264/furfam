import { getSiteUrl } from "@/lib/site-url";

/** Organization + WebSite structured data for India-focused discovery. */
export function SiteJsonLd() {
  const url = getSiteUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FurFam",
    url,
    description:
      "FurFam helps families across India discover dog breeds, learn responsible pet care, and connect with ethical breeding guidance.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    logo: `${url}/favicon.svg`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FurFam",
    url,
    publisher: {
      "@type": "Organization",
      name: "FurFam",
      url,
    },
    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
