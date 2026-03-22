/** Canonical site origin for metadata, sitemap, and share URLs. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://furfam.vercel.app"
  );
}
