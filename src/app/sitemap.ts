import type { MetadataRoute } from "next";
import { breeds, breedTypes } from "@/lib/breeds-data";
import { getAllBlogPosts } from "@/lib/blog-utils";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/services",
    "/faqs",
    "/blogs",
    "/breeds",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.85,
  }));

  for (const post of getAllBlogPosts()) {
    const lastMod = post.date ? new Date(post.date) : now;
    entries.push({
      url: `${base}/blogs/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const t of breedTypes) {
    entries.push({
      url: `${base}/breeds/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const b of breeds) {
    entries.push({
      url: `${base}/breeds/${b.typeSlug}/${b.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
