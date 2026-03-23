import "server-only";

import { breeds, breedTypes } from "@/lib/breeds-data";
import { getAllBlogPosts } from "@/lib/blog-utils";
import type { SearchResult } from "@/lib/search-data";

const pages: SearchResult[] = [
  {
    id: "home",
    title: "Home",
    description: "Find your perfect furry companion at FurFam",
    url: "/",
    category: "page",
    tags: ["furfam", "home", "dogs", "puppies"],
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about our commitment to ethical breeding and pet care",
    url: "/about",
    category: "page",
    tags: ["about", "ethical breeding", "pet care"],
  },
  {
    id: "services",
    title: "Services",
    description: "Explore our comprehensive pet care services",
    url: "/services",
    category: "page",
    tags: ["services", "pet care", "support"],
  },
  {
    id: "blogs",
    title: "Blogs",
    description: "Read expert advice and guides on dog care and breeds",
    url: "/blogs",
    category: "page",
    tags: ["blog", "articles", "guides"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team for personalized guidance",
    url: "/contact",
    category: "page",
    tags: ["contact", "help", "support"],
  },
  {
    id: "faqs",
    title: "FAQs",
    description: "Frequently asked questions about our services and breeds",
    url: "/faqs",
    category: "page",
    tags: ["faq", "questions", "help"],
  },
  {
    id: "breeds",
    title: "All Breeds",
    description: "Browse all dog breeds by type",
    url: "/breeds",
    category: "page",
    tags: ["breeds", "dog breeds", "all breeds"],
  },
];

/** Build the full search corpus at request/build time (no client `fs`, no `/api/search`). */
export function buildSearchResults(): SearchResult[] {
  const breedTypeResults: SearchResult[] = breedTypes.map((type) => ({
    id: `breed-type-${type.id}`,
    title: type.name,
    description: type.description,
    url: `/breeds/${type.slug}`,
    category: "page" as const,
  }));

  const breedResults: SearchResult[] = breeds.map((breed) => ({
    id: breed.id,
    title: breed.name,
    description: breed.description,
    url: `/breeds/${breed.typeSlug}/${breed.id}`,
    category: "breed" as const,
    tags: [breed.type, breed.size, ...breed.temperament],
  }));

  const posts = getAllBlogPosts();
  const blogResults: SearchResult[] = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    description: post.description,
    url: `/blogs/${post.slug}`,
    category: "blog" as const,
    tags: [post.category, ...post.tags],
  }));

  return [...pages, ...breedTypeResults, ...breedResults, ...blogResults];
}
